"use client";

import { updateBigListComplete } from "../actions";

type TaskCheckBoxProps = {
  id: string;
  projectId: string;
  completed: boolean;
};

export default function TaskCheckBox({
  id,
  projectId,
  completed,
}: TaskCheckBoxProps) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4"
      checked={completed}
      onChange={async (event) => {
        await updateBigListComplete(id, projectId, event.target.checked);
      }}
    />
  );
}
