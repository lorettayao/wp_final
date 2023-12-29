import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { addTask, getWriting } from "./actions";

import React from 'react';
import {} from './actions';

interface WritingShowPageProps {
    params: { writingId: string };
}
export default async function WritingShowPage(props: WritingShowPageProps) {
    const userToProject = await getWriting(props.params.writingId); //TODO: 改寫 getWriting function
    const writing = userToProject?.writing;
    if (!writing) {
      redirect("/writings");
    }
    // TODO: Change the outlook of the writing-showing page in this file.
    return (
        <main className="h-screen w-full overflow-hidden p-8 -my-1.5 font-serif">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold">{writing.name}</h1>
                <p className="text-lg">{writing.description}</p>
                </div>
                <div className="flex space-x-3">
                </div>
            </div>
        </main>
    );
}
