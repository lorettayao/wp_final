"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { createProject } from "../../actions";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import type { Project } from "@/lib/types";

export default function CreateProjectForm() {
  const [projectDescription, setProjectDescription] =
    useState<Project["description"]>("");

  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const projectName = [year, month, date].join("-") + " 單字";

  const handleCreate = async () => {
    setIsUploading(true);
    try {
      const newProject = await createProject(projectName, projectDescription);
      
      // After creating a project, redirect to the project page
      router.push(`/projects/${newProject.id}`);

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
    setProjectDescription("");
  };

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-10">
      <h1 className="text-3xl font-serif">{projectName}</h1>
      <div className="flex w-full flex-col gap-2">
        <Label className="text-lg font-serif">註解</Label>
        <Textarea
          className="font-serif"
          rows={10}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="隨手寫下你的想法吧！"
        />
      </div>
      <div className="flex w-full justify-end gap-2">
        <Button variant={"outline"}>
          <Link href="/projects" className="font-serif">取消</Link>
        </Button>
        <Button onClick={handleCreate} disabled={isUploading} className="font-serif">
          建立
          {isUploading && <Loader2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}
