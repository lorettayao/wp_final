import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";

import DeleteProjectButton from "./_components/DeleteProjectButton";
import TaskItem from "./_components/TaskItem";
import { getBigList ,getProjBigListId, getProject } from "./actions";

import { getGlobalDictionary } from "../actions";
type Props = {
  params: { projectId: string };
};

export default async function ProjectsPage(props: Props) {
  const userToProject = await getProject(props.params.projectId);
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
    fakeTasks[i] = {
      displayId: bigListTask[i].displayId,
      title: bigListDict[i].word,
      description: bigListDict[i].definition,
      completed: bigListTask[i].learned,
      id: bigListTask[i].wordIndex,
    }
  }
  return (
    <main className="h-screen w-full overflow-scroll p-8 -my-1.5 font-serif">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-lg">{project.description}</p>
        </div>
        <div className="flex space-x-3">
          {/* <HideTranButton /> */}
          {/* {visibility === "visible" ?
            <Button className="bg-blue-300 bg-opacity-80" onClick={handleClick}>
              Hide Translation
            </Button>
            :
            <Button className="bg-blue-300 bg-opacity-80" onClick={handleClick}>
              Show Translation
            </Button>
          } */}

          <DeleteProjectButton id={project.displayId} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="mx-auto w-full max-w-2xl">
        <section>
          <div className="mt-6">
            {fakeTasks.map((task) => (
              <TaskItem
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
