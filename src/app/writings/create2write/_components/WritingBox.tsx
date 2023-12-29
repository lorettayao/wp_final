"use client";

import { useState } from "react";
import Select from "react-select";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import { createWriting } from "../../actions2write";
import { createWriting } from "../../actions";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
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
  const topic = [
    "Topic 1",
    "Topic 2",
  ]
  const formattedTopic = topic.map((name) => ({
    value: name,
    label: name,
  }))
  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    setProjectName(selectedOption?.value || '');
  };

  const handleCreate = async () => {
    setIsUploading(true);
    try {
      const newWriting = await createWriting(projectName, projectDescription);

      // After creating a project, redirect to the project page
     
      // router.push(`/projects/${newWriting.id}`);
      // window.location.href = `/projects/writingshow/${newWriting.id}`;
      // 用router才不會一直跳掉
      router.push(`/writings/${newWriting.id}`);
      
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
      
      <Select
        options={formattedTopic}
   
        value={formattedTopic.find((option) => option.value === projectName)}
        onChange={handleSelectChange}
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
