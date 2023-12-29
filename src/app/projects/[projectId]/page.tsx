import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import DeleteProjectButton from "./_components/DeleteProjectButton";
import CompleteProjectButton from "./_components/CompleteProjectButton";
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
  let completed1 = false;
  if (!project) {
    redirect("/projects");
  }

  return (
    <main className="h-screen w-full overflow-hidden p-8 -my-1.5 font-serif">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-lg">{project.description}</p>
        </div>
        <div className="flex space-x-3">
          <CompleteProjectButton id={project.displayId} />
          <DeleteProjectButton id={project.displayId} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="mx-auto w-full max-w-2xl">
        <section>

          {/* CHANGED: comment out the "add task form" section */}
          {/* <form
            className="mx-auto flex flex-col gap-4 px-12"
            action={async (formData) => {
              "use server";

              const newTask = {
                projectId: project.displayId,
                title: formData.get("title"),
                description: formData.get("description"),
              };

              // input sanitization done in "addTask" function
              await addTask(newTask);
            }}
          >
            <div className="flex gap-4">
              <Input
                id="task-title-input"
                // data-testid="task-title-input"
                placeholder="task title"
                name="title"
              />
              <Button data-testid="add-task-button">add task</Button>
            </div>
            <Textarea placeholder="task description" name="description" />
          </form> */}

          {/* CHANGED: add an example task (since i cannot add tasks now) */}
          {/* for testing purpose BEGIN */}
          <div className="mt-6">
            <div className="flex items-center gap-6">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={completed1}
            />
              <div className="w-full">
                <h2 className="text-xl">dog</h2>
                <p className="text-gray-400">狗勾</p>
              </div>
              <Button>delete</Button>
            </div>
            <Separator className="my-4" />
          </div>
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
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
