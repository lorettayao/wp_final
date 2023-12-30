"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SubmitQuizProps = {
  id: string;
};

export default function SubmitButton({ id }: SubmitQuizProps) {
  const router = useRouter();
  const handleClick = () => {
    console.log("Submit Quiz !");
    router.push(`/projects/${id}`);
  }

  return (
    <Button className="bg-green-600 bg-opacity-80 bg-fixed font-serif" onClick={handleClick}>
      Submit
    </Button>
  );
}
