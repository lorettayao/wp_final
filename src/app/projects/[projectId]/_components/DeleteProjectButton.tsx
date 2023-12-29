"use client";

import { deleteProject } from "../actions";

import { Button } from "@/components/ui/button";

type DeleteProjectProps = {
  id: string;
};

export default function DeleteProjectButton({ id }: DeleteProjectProps) {
  return (
    <Button className="bg-red-500 bg-opacity-80 font-serif" onClick={() => deleteProject(id)}>
      Delete
    </Button>
  );
}
