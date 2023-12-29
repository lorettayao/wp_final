"use client";
import OpenAI from "openai";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { publicEnv } from "@/lib/env/public";
// import { openAIEnv } from "@/lib/env/openAI";

// import { z } from "zod";
// const OpenAIEnvSchema = z.object({
//   OPENAI_KEY: z.string().url(),
// });
// type OpenAIEnv = z.infer<typeof OpenAIEnvSchema>;
// const openAIEnv: OpenAIEnv = {
//   OPENAI_KEY: process.env.OPENAI_KEY!,
// };
// OpenAIEnvSchema.parse(openAIEnv);



type GPTJudgeProps = {
  title: string;
  content: string | null;
};

export default function ChatGPTJudgeButton({ title, content }: GPTJudgeProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [judged, setJudged] = useState(false);
  const [judgeResult, setJudgeResult] = useState("");
  // const key = openAIEnv.OPENAI_KEY;
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
  //   // apiKey: "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",
  //   dangerouslyAllowBrowser: true
  // });
  const handleJudge = async () => {
    setErrorMessage("");
    setJudgeResult("");
    setJudged(true);
  
    const message = "Title: " + title + "\n" + "Content: " + content + "\n" + "Judge: ";
    // const apiKey = openai.apiKey;
    const apiKey = "no_key_crycry";
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; 
    const input = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are a helpful judge.' },
        { role: 'user', content: message },
        { role: 'assistant', content: 'Hi there! How can I help you today?' },
      ],
    };
    console.log('API Request:', input);
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(input),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        // Handle the response data as needed
        setJudgeResult(data);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage(error);
      });
  }

  return (
    <Button 
      className="bg-green-500 bg-opacity-80 font-serif" onClick={() => {handleJudge()}}
    >
      Judge
    </Button>
  );
}
