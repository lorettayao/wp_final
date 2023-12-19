import { z } from "zod";

const privateEnvSchema = z.object({
  // TODO: 1.2 Add your private environment variables here for your database (postgres)
  POSTGRES_URL: z.string().url(),
  // TODO: 1.2 end
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  // TODO: 1.3 Add your private environment variables here for your database (postgres)
  POSTGRES_URL: process.env.POSTGRES_URL!,
  // TODO: 1.3 end
};

privateEnvSchema.parse(privateEnv);
