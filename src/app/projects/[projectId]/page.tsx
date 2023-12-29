import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import DeleteProjectButton from "./_components/DeleteProjectButton";
import CompleteProjectButton from "./_components/CompleteProjectButton";
import HideTranButton from "./_components/HideTranButton";
import TaskItem from "./_components/TaskItem";
import { addTask, getProject } from "./actions";

import TaskCheckBox from "./_components/TaskCheckBox";
import DeleteTaskItemButton from "./_components/DeleteTaskButton";

type Props = {
  params: { projectId: string };
};

export default async function ProjectsPage(props: Props) {
  const userToProject = await getProject(props.params.projectId);
  const project = userToProject?.project;
  if (!project) {
    redirect("/projects");
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
          <CompleteProjectButton id={project.displayId} />
          <DeleteProjectButton id={project.displayId} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="mx-auto w-full max-w-2xl">
        <section>
          {/* for testing purpose BEGIN */}
          {/* for testing purpose END */}

          <div className="mt-6">
            {project.tasks.map((task) => (
              <TaskItem
                key={task.displayId}
                id={task.displayId}
                projectId={project.displayId}
                completed={task.completed}
                title={task.title}
                description={task.description}
                // visibility={visibility}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
