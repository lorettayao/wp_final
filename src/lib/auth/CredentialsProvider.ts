import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable, bigListTable, globalDictionaryTable } from "@/db/schema";

const authSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().min(1).max(100).email(),
  password: z.string().min(8),
});

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    name: { label: "Name", type: "text", optional: true },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
      name?: string;
      password: string;
    };

    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      return null;
    }
    const { email, name, password } = validatedCredentials;

    const [existedUser] = await db
      .select({
        id: usersTable.displayId,
        name: usersTable.name,
        email: usersTable.email,
        provider: usersTable.provider,
        hashedPassword: usersTable.hashedPassword,
      })
      .from(usersTable)
      .where(eq(usersTable.email, validatedCredentials.email.toLowerCase()))
      .execute();
    if (!existedUser) {
      // Sign up
      if (!name) {
        console.log("Name is required.");
        return null;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [createdUser] = await db
        .insert(usersTable)
        .values({
          name: name,
          email: email.toLowerCase(),
          hashedPassword: hashedPassword,
          provider: "credentials",
        })
        .returning();

      const globalDictionary = await db
        .select({
          id: globalDictionaryTable.id,
        })
        .from(globalDictionaryTable)
        .execute();

      const bigList = globalDictionary.map((item) => ({
        userId: createdUser.displayId,
        wordIndex: item.id,
        learned: false,
      }));
      await db.insert(bigListTable).values(bigList).returning();

        return {
        email: createdUser.email,
        name: createdUser.name,
        id: createdUser.displayId,
        provider: createdUser.provider,
      };
    }

    // Sign in
    if (existedUser.provider !== "credentials") {
      console.log(`The email has registered with ${existedUser.provider}.`);
      return null;
    }
    if (!existedUser.hashedPassword) {
      console.log("The email has registered with social account.");
      return null;
    }
    const isValid = await bcrypt.compare(password, existedUser.hashedPassword);

    if (!isValid) {
      console.log("Wrong password. Try again.");
      return null;
    }
    return {
      email: existedUser.email,
      name: existedUser.name,
      id: existedUser.id,
      provider: existedUser.provider,
    };
  },
});
