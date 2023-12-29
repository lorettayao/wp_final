"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { tasksTable, usersToProjectsTable, bigListToProjectsTable, bigListTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
export async function getBigList(displayId:string){
  const bL = await db.query.bigListTable.findFirst({
    where: eq(bigListTable.displayId, displayId),
    columns: {
      displayId: true,
      learned: true,
      learnedDate: true,
      wordIndex: true,
    }
  });
  return bL;
}

export async function getProjBigListId(projectId: string) {
  const bigListToProject = await db
    .select({
      bigListId: bigListToProjectsTable.bigListId,
    })
    .from(bigListToProjectsTable)
    .where(eq(bigListToProjectsTable.projectId, projectId))
    .execute();

  return bigListToProject;
}
export async function getProject(projectId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  const userToProject = await db.query.usersToProjectsTable.findFirst({
    // Select the correct project by userId and projectId
    where: and(
      eq(usersToProjectsTable.userId, userId),
      eq(usersToProjectsTable.projectId, projectId)
    ),
    columns: {},
    with: {
      project: {
        columns: {
          displayId: true,
          description: true,
          name: true,
        },
        with: {
          tasks: {
            columns: {
              displayId: true,
              completed: true,
              description: true,
              title: true,
            },
            orderBy: [asc(tasksTable.id)],
          },
        },
      },
    },
  });

  return userToProject;
}

const addTaskSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  description: z.string(),
});

export async function addTask(newTask: {
  projectId: string;
  title: string | null;
  description: string | null;
}) {
  addTaskSchema.parse(newTask);
  const { projectId, title, description } = newTask as z.input<
    typeof addTaskSchema
  >;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  await db
    .insert(tasksTable)
    .values({
      projectId,
      title,
      description,
    })
    .returning();

  revalidatePath(`/projects/${projectId}`);
}

const updateBigListCompleteSchema = z.object({
  bigListId: z.string(),
  projectId: z.string(),
  learned: z.boolean(),
});

export async function updateBigListComplete(
  bigListId: string,
  projectId: string,
  learned: boolean,
) {
  updateBigListCompleteSchema.parse({
    projectId,
    bigListId,
    learned,
  });

  // Update the task's `completed` column
  await db
  .update(bigListTable)
  .set({
    learned: learned,
    learnedDate: learned ? new Date().toISOString() : null,
  })
  .where(eq(bigListTable.displayId, bigListId))
  .returning();
  

  revalidatePath(`/projects/${projectId}`);
}

const deleteTaskSchema = z.object({
  taskId: z.string(),
  projectId: z.string(),
});

export async function deleteTask(taskId: string, projectId: string) {
  deleteTaskSchema.parse({
    projectId,
    taskId,
  });

  // Delete the task whose displayId is `taskId`
  await db
    .delete(tasksTable)
    .where(eq(tasksTable.displayId, taskId))
    .returning();

  revalidatePath(`/projects/${projectId}`);
}

const deleteProjectSchema = z.object({
  projectId: z.string(),
});

export async function deleteProject(projectId: string) {
  deleteProjectSchema.parse({
    projectId,
  });

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  await db
    .delete(usersToProjectsTable)
    .where(
      and(
        eq(usersToProjectsTable.projectId, projectId),
        eq(usersToProjectsTable.userId, userId),
      ),
    )
    .returning();

  revalidatePath(`/projects`);
}
