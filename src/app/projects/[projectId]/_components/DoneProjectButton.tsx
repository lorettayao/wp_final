"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type DoneProjectProps = {
  id: string;
};


export default function DoneProjectButton({ id }: DoneProjectProps) {
  const router = useRouter();
  const handleClick = () => {
    console.log("Quiz time!");
    router.push(`/projects/${id}/quiz`);
  }

  return (
    <Button className="bg-green-600 bg-opacity-80 bg-fixed font-serif" onClick={handleClick}>
      Quiz
    </Button>
  );
}
