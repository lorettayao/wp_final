"use client";

import { deleteWriting } from "../actions";

import { Button } from "@/components/ui/button";

type DeleteWritingProps = {
  id: string;
};

export default function DeleteWritingButton({ id }: DeleteWritingProps) {
  return (
    <Button className="bg-red-500 bg-opacity-80 font-serif" onClick={() => deleteWriting(id)}>
      delete
    </Button>
  );
}
