"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

// import { createWriting } from "../../actions2write";
import { createWriting } from "../../actions";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import type { Project } from "@/lib/types";

export default function CreateProjectForm() {
  const [projectName, setProjectName] = useState<Project["name"]>("");
  const [projectDescription, setProjectDescription] =
    useState<Project["description"]>("");

  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCreate = async () => {
    setIsUploading(true);
    try {
      const newProject = await createWriting(projectName, projectDescription);

      // After creating a project, redirect to the project page
     
      // router.push(`/projects/${newProject.id}`);
      window.location.href = `/projects/writingshow/${newProject.id}`;

    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
    setIsUploading(false);
    setProjectName("");
    setProjectDescription("");
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-10 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Writing Practice</h1>
        <div className="flex gap-2">
          <Button variant={"outline"}>
            <Link href="/projects">Cancel</Link>
          </Button>
          <Button onClick={handleCreate} disabled={isUploading}>
            Create
            {isUploading && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label className="text-xl">Topic</Label>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label className="text-xl">Writing Box</Label>
        <Textarea
          rows={10}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-end gap-2">
        <Button variant={"outline"}>
          <Link href="/projects">Cancel</Link>
        </Button>
        <Button onClick={handleCreate} disabled={isUploading}>
          Create
          {isUploading && <Loader2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}
