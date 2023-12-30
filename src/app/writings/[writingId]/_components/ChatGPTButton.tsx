"use client";
import { Button } from "@/components/ui/button";

type GPTJudgeProps = {
  title: string;
  content: string | null;
};

export default function ChatGPTJudgeButton({ title, content }: GPTJudgeProps) {
  const handleJudge = async () => {
    // const message = "Title: " + title + "\n" + "Content: " + content + "\n" + "Judge: ";
    // Construct the URL with the string parameter
    const chatGPTUrl = `https://chat.openai.com/`;
    console.log(title);
    console.log(content);
    // Redirect to the ChatGPT page
    window.location.href = chatGPTUrl;
  }

  return (
    <Button 
      className="bg-green-500 bg-opacity-80 font-serif" onClick={() => {handleJudge()}}
    >
      Judge
    </Button>
  );
}
