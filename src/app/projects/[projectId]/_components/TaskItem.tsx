import { Separator } from "@/components/ui/separator";
import TaskCheckBox from "./TaskCheckBox";

type TaskItemProps = {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  description: string | null;
};

export default function TaskItem({
  id,
  projectId,
  completed,
  title,
  description,
}: TaskItemProps) {
  return (
    <>
      <div className="flex items-center gap-6">
        <TaskCheckBox id={id} projectId={projectId} completed={completed} />
        <div className="w-full">
          <h2 className="text-xl">{title}</h2>
          <p className="text-gray-400 ">{description}</p>
        </div>
        {/* <Button className="bg-blue-300 bg-opacity-80 font-serif">Delete</Button> */}
      </div>
      <Separator className="my-4" />
    </>
  );
}
