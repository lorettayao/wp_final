import type { DefaultSession } from "next-auth";

import type { User } from "@/lib/types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: User;
  }
}
