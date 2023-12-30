"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import {  usersToWritingTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";


export async function getWriting(writingId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  const userToWriting = await db.query.usersToWritingTable.findFirst({
    // Select the correct project by userId and writingId
    where: and(
      eq(usersToWritingTable.userId, userId),
      eq(usersToWritingTable.writingId, writingId)
    ),
    columns: {},
    with: {
      writing: {
        columns: {
          displayId: true,
          description: true,
          name: true,
        },
      },
    },
  });

  return userToWriting;
}

const deleteWritingSchema = z.object({
  writingId: z.string(),
});

export async function deleteWriting(writingId: string) {
  deleteWritingSchema.parse({
    writingId,
  });

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  await db
    .delete(usersToWritingTable)
    .where(
      and(
        eq(usersToWritingTable.writingId, writingId),
        eq(usersToWritingTable.userId, userId),
      ),
    )
    .returning();

  revalidatePath(`/homePage`);
}