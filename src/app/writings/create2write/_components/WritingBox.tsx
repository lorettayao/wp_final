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
    "Topic 3",
  ]
  const formattedTopic = topic.map((name) => ({
    value: name,
    label: name,
  }))
  const [selectedSpecialString, setSelectedSpecialString] = useState<string>('');
  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      const specialStringMap: Record<string, string> = {
        'Topic 1': 'Some people believe that the purpose of education is to free the mind and the spirit. Others believe that formal education tends to restrain our minds and spirits rather than set them free. Write a response in which you discuss which view more closely aligns with your own position and explain your reasoning for the position you take. In developing and supporting your position, you should address both of the views presented.',
        'Topic 2': 'Leaders are created by the demands that are placed on them.Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.',
        'Topic 3' : 'rfedijnagif'
        // Add more mappings for other options if needed
      };
      const specialString = specialStringMap[selectedOption.value] || '';
      setProjectName(specialString);
      setSelectedSpecialString(specialString); // Update the selected special string
    } else {
      setProjectName('');
      setSelectedSpecialString(''); // Clear the selected special string
    }
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
    <div className="flex flex-col min-h-screen w-full p-10 overflow-y-auto font-serif">
  <div className="flex justify-between items-center"> {/* Selection dropdown and buttons */}
    <Select
      options={formattedTopic}
      value={formattedTopic.find((option) => option.value === projectName)}
      onChange={handleSelectChange}
    />
    <div className="flex gap-4"> {/* Buttons */}
      <Button variant={"outline"}>
        <Link href="/projects">Cancel</Link>
      </Button>
      <Button onClick={handleCreate} disabled={isUploading}>
        Create
        {isUploading && <Loader2 className="animate-spin" />}
      </Button>
    </div>
  </div>

  {selectedSpecialString && <div>{selectedSpecialString}</div>} 

  {/* Writing Box and associated elements */}
  <div className="flex w-full flex-col gap-2">
    <Label className="text-xl">Writing Box</Label>
    <Textarea
      rows={10}
      value={projectDescription}
      onChange={(e) => setProjectDescription(e.target.value)}
    />
  </div>

  {/* Additional elements (if any) */}
  <div className="flex w-full justify-end gap-2">
    {/* Your additional elements go here */}
  </div>
</div>

  );
}
