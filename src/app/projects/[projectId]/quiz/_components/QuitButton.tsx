"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type QuitProjectProps = {
  id: string;
};

export default function QuitButton({ id }: QuitProjectProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/projects/${id}`);
  }

  return (
    <Button className="bg-blue-400 bg-opacity-90 bg-fixed font-serif my-1" onClick={handleClick}>
      Back
    </Button>
  );
}
