"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { tasksTable, usersToWritingTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

export async function getWriting(writingId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  const userToWriting = await db.query.usersToWritingTable.findFirst({
    // Select the correct project by userId and writingId
    where: and(
      eq(usersToWritingTable.userId, userId),
      eq(usersToWritingTable.writingId, writingId)
    ),
    columns: {},
    with: {
      writing: {
        columns: {
          displayId: true,
          description: true,
          name: true,
        },
      },
    },
  });

  return userToWriting;
}

// const addTaskSchema = z.object({
//   projectId: z.string(),
//   title: z.string(),
//   description: z.string(),
// });

// export async function addTask(newTask: {
//   projectId: string;
//   title: FormDataEntryValue | null;
//   description: FormDataEntryValue | null;
// }) {
//   addTaskSchema.parse(newTask);
//   const { projectId, title, description } = newTask as z.input<
//     typeof addTaskSchema
//   >;

//   const session = await auth();
//   const userId = session?.user?.id;
//   if (!userId) {
//     redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
//   }

//   await db
//     .insert(tasksTable)
//     .values({
//       projectId,
//       title,
//       description,
//     })
//     .returning();

//   revalidatePath(`/projects/${projectId}`);
// }

// const updateTaskCmpleteSchema = z.object({
//   taskId: z.string(),
//   projectId: z.string(),
//   completed: z.boolean(),
// });

// export async function updateTaskComplete(
//   taskId: string,
//   projectId: string,
//   completed: boolean,
// ) {
//   updateTaskCmpleteSchema.parse({
//     projectId,
//     taskId,
//     completed,
//   });

//   // Update the task's `completed` column
//   await db
//   .update(tasksTable)
//   .set({
//     completed: completed
//   })
//   .where(eq(tasksTable.displayId, taskId))
//   .returning();
  

//   revalidatePath(`/projects/${projectId}`);
// }

// const deleteTaskSchema = z.object({
//   taskId: z.string(),
//   projectId: z.string(),
// });

// export async function deleteTask(taskId: string, projectId: string) {
//   deleteTaskSchema.parse({
//     projectId,
//     taskId,
//   });

//   // Delete the task whose displayId is `taskId`
//   await db
//     .delete(tasksTable)
//     .where(eq(tasksTable.displayId, taskId))
//     .returning();

//   revalidatePath(`/projects/${projectId}`);
// }

const deleteWritingSchema = z.object({
  writingId: z.string(),
});

export async function deleteWriting(writingId: string) {
  deleteWritingSchema.parse({
    writingId,
  });

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  await db
    .delete(usersToWritingTable)
    .where(
      and(
        eq(usersToWritingTable.writingId, writingId),
        eq(usersToWritingTable.userId, userId),
      ),
    )
    .returning();

  revalidatePath(`/homePage`);
}

const ChatGPTJudgeSchema = z.object({
  writingId: z.string(),
  writingTitle: z.string(),
  writingContent: z.string(),
});

export async function ChatGPTJudge(
  writingId: string,
  writingTitle: string,
  writingContent: string | null,
) {
  ChatGPTJudgeSchema.parse({
    writingId,
    writingTitle,
    writingContent,
  });

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  // const message = "Title: " + writingTitle + "\n" + "Content: " + writingContent + "\n" + "Judge: ";
  const message = "Title";
  const apiKey = openai.apiKey;
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; 
  const input = {
    model: "gpt-3.5-turbo-instruct",
    messages: [
      // { role: 'system', content: 'You are a helpful judge.' },
      { role: 'user', content: message },
      // { role: 'assistant', content: 'Hi there! How can I help you today?' },
    ],
  };
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
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
      return error;
    });

  // revalidatePath(`/homePage`);
}