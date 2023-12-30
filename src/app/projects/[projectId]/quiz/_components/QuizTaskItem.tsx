"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateBigListComplete } from "../actions";

type TaskItemProps = {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  description: string | null;
};

export default function QuizTaskItem({
  id,
  projectId,
  title,
  description,
}: TaskItemProps) {
  const [inputTitle, setInputTitle] = useState("");
  const [correct, setCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async () => {
    setSubmitted(true);
    if (inputTitle === title) {
      console.log("Correct!");
      setCorrect(true);
      // await updateBigList(id, projectId);
    } else {
      console.log("Wrong!");
      setCorrect(false);
      await updateBigListComplete(id, projectId, false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-6">
        <div className="w-full">
          {submitted ? 
            <p className="text-black ">{title}</p>
          :
            <input 
              type="text" 
              className="border border-black rounded-sm p-1" 
              placeholder="Your Answer" 
              onChange={(e) => {setInputTitle(e.target.value)}}>
            </input>
          }
          {/* <input 
            type="text" 
            className="border border-black rounded-sm p-1" 
            placeholder="Your Answer" 
            onChange={(e) => {setInputTitle(e.target.value)}}>
          </input> */}
          
          <p className="text-black">{description}</p>
        </div>
        {submitted ?
          correct ? 
            <p className="text-green-700 font-bold text-2xl ">V</p>
            :
            <p className="text-red-700 font-bold text-2xl ">X</p>
          :
            <Button className="bg-green-600 bg-opacity-80 font-serif" onClick={handleSubmit}>
              Submit
            </Button>
        }
        
      </div>
      <Separator className="my-4" />
    </>
  );
}
