"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { createProject } from "../../actions";
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
      const newProject = await createProject(projectName, projectDescription);

      // TODO: 5. After creating a project, redirect to the project page
      // hint: Why are some variables unused?
      router.push(`/projects/${newProject.id}`);

      // TODO: 5. end
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
    <div className="flex h-screen w-full flex-col gap-4 p-10">
      <h1 className="text-3xl">Create a new project</h1>
      <div className="flex w-full flex-col gap-2">
        <Label className="text-xl">Project Name</Label>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label className="text-xl">Project Description</Label>
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
