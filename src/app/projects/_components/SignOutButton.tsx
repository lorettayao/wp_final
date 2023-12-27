"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { publicEnv } from "@/lib/env/public";

export default function SignOutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
  };

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);
  return <Button data-testid="sign-out-button" variant={"outline"} onClick={handleSignOut} className="font-serif">Sign Out</Button>;
}