import { redirect } from "next/navigation";
import { getWriting } from "./actions";
import DeleteWritingButton from "./_components/DeleteWritingButton";
// import ChatGPTJudgeButton from "./_components/ChatGPTButton";

import React from 'react';
import {} from './actions';

interface WritingShowPageProps {
    params: { writingId: string };
}
export default async function WritingShowPage(props: WritingShowPageProps) {
    const userToWriting = await getWriting(props.params.writingId);
    const writing = userToWriting?.writing;
    if (!writing) {
      redirect("/writings");
    }
    // TODO: Change the outlook of the writing-showing page in this file.
    return (
<main className="h-screen w-full overflow-hidden p-8 font-serif">
  <div className="flex flex-col h-full">
  <div className="ml-auto">
        <DeleteWritingButton id={writing.displayId} />
      </div>
    <div className="flex items-center justify-between bg-gray-200 p-4 mb-4">
      <h1 className="text-2xl font-bold">{writing.name}</h1>
      
    </div>
    <div className="flex-1 overflow-y-auto">
      <p className="text-lg mx-6 my-5">{writing.description}</p>
    </div>
  </div>
</main>



    );
}
