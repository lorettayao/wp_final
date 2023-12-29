"use client";

// import { deleteProject } from "../actions";

import { Button } from "@/components/ui/button";

// type CompleteProjectProps = {
//   id: string;
// };

// TODO: change the onClick function to go to the Quiz
// Better if write the function in "../actions" file instead of here
export default function CompleteProjectButton() {
  return (
    <Button className="bg-green-600 bg-opacity-80 bg-fixed font-serif" onClick={() => console.log("Quiz time!")}>
      Done
    </Button>
  );
}
