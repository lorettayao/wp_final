"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { bigListTable, projectsTable, usersTable, usersToProjectsTable, usersToWritingTable, bigListToProjectsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import type { Project, User } from "@/lib/types";
export async function getUsers(userId: string) {
  const users = await db.query.usersTable.findFirst({
    where: eq(usersTable.displayId, userId),
    columns: {
      displayId: true,
      name: true,
    },
  });
  return users;
}
function getRandomIndices(n:number, max:number) {
  const indices: number[] = [];
  const min:number = n<max?n:max;
  for(let i = 0; i < min; i++) {
    let rand = Math.floor(Math.random() * max);
    while(indices.includes(rand)) {
      rand = Math.floor(Math.random() * max);
    }
    indices[i] = rand;
  }
  return indices;
}
export async function getTodayGlobalRanking() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const records = await db
    .select(
      {
        learned: bigListTable.learned,
        userId: bigListTable.userId,
      }
    )
    .from(bigListTable)
    .where(and (eq(bigListTable.learnedDate, new Date().toISOString()), eq(bigListTable.learned, true)))
    .execute();
  return {
    records, userId
  };
}

export async function getAllTimeGlobalRanking() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const records = await db
    .select(
      {
        learned: bigListTable.learned,
        userId: bigListTable.userId,
      }
    )
    .from(bigListTable)
    .where(and (eq(bigListTable.learned, true)))
    .execute();
  return {
    records, userId
  };
}

export async function getMyRecordData() {
  // get the number of true in "learned" column with correspoding "learnedDate" in BigTable with userId = userId
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const records = await db
    .select(
      {
        learned: bigListTable.learned,
        learnedDate: bigListTable.learnedDate,
      }
    )
    .from(bigListTable)
    .where(and (eq(bigListTable.userId, userId), eq(bigListTable.learned, true)))
    .execute();
  return records;
}

const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

export async function createProject(
  name: Project["name"],
  description?: Project["description"],
) {
  // Check if user is logged in
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  // Validate input
  try {
    createProjectSchema.parse({
      name: name,
      description: description,
    });
  } catch (error) {
    throw new Error(
      "Project name is required and must be less than 100 chars.",
    );
  }

  const newProject: Project = await db.transaction(async (trx) => {
    const [createdProject] = await trx
      .insert(projectsTable)
      .values({
        name: name,
        description: description,
      })
      .returning();
    const projectId = createdProject.displayId;

    await trx.insert(usersToProjectsTable).values({
      userId: userId,
      projectId: projectId,
    });

    const unlearnedBigList = await db
    .select({
      id: bigListTable.id,
      displayId: bigListTable.displayId,
      wordIndex: bigListTable.wordIndex,
    })
    .from(bigListTable)
    .where(and(eq(bigListTable.userId, userId),
      eq(bigListTable.learned, false))
    ) 
    .execute();
  
    const numberOfItems = 7;
    const randomIndices = getRandomIndices(numberOfItems, unlearnedBigList.length);
    for(  let i = 0; i < randomIndices.length; i++) {
      await trx.insert(bigListToProjectsTable).values({
        projectId: projectId,
        bigListId: unlearnedBigList[randomIndices[i]].displayId
      });
    }
    return {
      id: projectId,
      name: createdProject.name,
      description: createdProject.description
        ? createdProject.description
        : undefined,
    };
  });

  // Update the navbar for the user's projects
  revalidatePath("/projects");

  return newProject;
}

export async function getProjects(userId: User["id"]) {
  const temp = await db.query.usersToProjectsTable.findMany({
    where: eq(usersToProjectsTable.userId, userId),
    with: {
      project: {
        columns: {
          displayId: true,
          name: true,
        },
      },
    },
  });

  const projects: Omit<Project, "description">[] = temp.map((item) => ({
    id: item.project.displayId,
    name: item.project.name,
  }));
  return projects;
}

export async function getWritings(userId: User["id"]) {
  const temp = await db.query.usersToWritingTable.findMany({
    where: eq(usersToWritingTable.userId, userId),
    with: {
      writing: {
        columns: {
          displayId: true,
          name: true,
        },
      },
    },
  });

  const writings: Omit<Project, "description">[] = temp.map((item) => ({
    id: item.writing.displayId,
    name: item.writing.name,
  }));
  return writings;
}