import { redirect } from "next/navigation";
import { getWriting } from "./actions";
import DeleteWritingButton from "./_components/DeleteWritingButton";
import ChatGPTJudgeButton from "./_components/ChatGPTButton";

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
        <main className="h-screen w-full overflow-scroll p-8 -my-1.5 font-serif">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex">
                        <h1 className="text-3m font-bold mx-3">{writing.name}</h1>
                        <div className="flex space-x-3 mx-10 my-0.5">
                            <ChatGPTJudgeButton title={writing.name} content={writing.description} />
                            <DeleteWritingButton id={writing.displayId} />
                        </div>
                    </div>
                <p className="text-lg mx-6 my-5">{writing.description}</p>
                </div>
            </div>
            
        </main>
    );
}
