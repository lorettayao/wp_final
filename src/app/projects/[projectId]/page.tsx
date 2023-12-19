import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import DeleteProjectButton from "./_components/DeleteProjectButton";
import TaskItem from "./_components/TaskItem";
import { addTask, getProject } from "./actions";

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
    <main className="h-screen w-full overflow-hidden p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-lg">{project.description}</p>
        </div>
        <DeleteProjectButton id={project.displayId} />
      </div>
      <Separator className="my-4" />
      <div className="mx-auto w-full max-w-2xl">
        <section>
          <form
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
          </form>
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
