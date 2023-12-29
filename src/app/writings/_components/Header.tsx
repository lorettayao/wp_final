import Link from "next/link";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import SignOutButton from "./SignOutButton";
// import logoImage from "@/../public/EE-logo-2.png";

export default async function Header() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session?.user) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  return (
    <nav className="flex min-w-fit flex-col justify-between gap-2 overflow-hidden font-serif">
      <div className="flex h-10 w-full flex-row items-center gap-12 px-6 py-8 pt-8">
        <Link href="/homePage">
          <h2 className="text-xl font-bold">
            {"< "}GRE StudEE
          </h2>
        </Link>
        <div className="flex gap-8 px-4 py-2 fixed top-2.5 right-0">
            <div className="flex items-center gap-2">
            <span className="text-md font-semibold">
                {
                session?.user?.name || "User"
                }
            </span>
            </div>
            <SignOutButton />
        </div>
      </div>
      <Separator />
    </nav>
  );
}
