"use client";

import { deleteTask } from "../actions";

import { Button } from "@/components/ui/button";

type DeleteTaskItemProps = {
  id: string;
  projectId: string;
};

export default function DeleteTaskItemButton({
  id,
  projectId,
}: DeleteTaskItemProps) {
  return (
    <Button className="bg-red-500" onClick={() => deleteTask(id, projectId)}>
      delete
    </Button>
  );
}
