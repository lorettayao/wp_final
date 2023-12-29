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
                    <div className="flex w-full h-14 p-2 -my-1">
                        <h1 className="text-3xl font-bold mx-3">{writing.name}</h1>
                        <div className="object-right-top my-0.5">
                            {/* <ChatGPTJudgeButton title={writing.name} content={writing.description} /> */}
                            <DeleteWritingButton id={writing.displayId} />
                        </div>
                    </div>
                <p className="text-lg mx-6 my-5">{writing.description}</p>
                </div>
            </div>
            
        </main>
    );
}
