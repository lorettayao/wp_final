import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";

import { Separator } from "@/components/ui/separator";

// import TaskItem from "../_components/TaskItem";
import QuizTaskItem from "./_components/QuizTaskItem";
import { Button } from "@/components/ui/button";
import QuitButton from "./_components/QuitButton";
import SubmitButton from "./_components/SubmitButton";
import { getBigList ,getProjBigListId, getProject } from "./actions";

import { getGlobalDictionary } from "../../actions";
type Props = {
  params: { projectId: string };
};

export default async function QuizPage(props: Props) {
  const projectId = props.params.projectId;
  const userToProject = await getProject(projectId);
  const project = userToProject?.project;
  if (!project) {
    redirect("/projects");
  }
  const projBigList = await getProjBigListId(props.params.projectId);
  const bigListTask : ({displayId: string, wordIndex: number, learned: boolean, learnedDate: string | null})[] = [];

  const bigListDict : {id : number, word: string, definition: string}[] = [];
  for (let i = 0; i < projBigList.length; i++) {
    const task = await getBigList(projBigList[i].bigListId);
    if (task) {
      bigListTask[i] = task;
      bigListDict[i] = await getGlobalDictionary(task.wordIndex);
    }
  }
  const fakeTasks = [];
  for (let i = 0; i < projBigList.length; i++) {
    if (bigListTask[i].learned==true) {
      let item = {
        displayId: bigListTask[i].displayId,
        title: bigListDict[i].word,
        description: bigListDict[i].definition,
        completed: bigListTask[i].learned,
        id: bigListTask[i].wordIndex,
      }
      fakeTasks.push(item);
    }
  }

  return (
    <main className="h-screen w-full overflow-scroll p-8 -my-1.5 font-serif">
      <div className="flex p-5">
        <h1 className="font-bold text-3xl mx-10"> {project.name} Quiz </h1>
        <QuitButton id={projectId} />
      </div>
      <div className="mx-auto w-full max-w-2xl my-10">
        <section>
          <div className="mt-6">
            {fakeTasks.map((task) => (
              <QuizTaskItem
                key={task.displayId}
                id={task.displayId}
                projectId={project.displayId}
                completed={task.completed}
                title={task.title}
                description={task.description}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
