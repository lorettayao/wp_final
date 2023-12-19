import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { privateEnv } from "@/lib/env/private";

import * as schema from "./schema";

const client = new Client({
  // TODO: 1.1 Add your private environment variables here for your database (postgres)
  connectionString: privateEnv.POSTGRES_URL,
  // TODO: 1.1 end

  connectionTimeoutMillis: 5000,
});
await client.connect();
export const db = drizzle(client, { schema });
