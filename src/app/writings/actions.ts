"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// import { eq } from "drizzle-orm";
// import { z } from "zod";

import { db } from "@/db";
// import { projectsTable, usersToProjectsTable } from "@/db/schema";
import { writingTable, usersToWritingTable } from "@/db/schema";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import type { Project } from "@/lib/types";



export async function createWriting(
  name: string,
  description?: string,
): Promise<Project> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  // Validate input
  

  const newWriting: Project = await db.transaction(async (trx) => {
    const [createdWriting] = await trx
      .insert(writingTable)
      .values({
        name: name,
        description: description,
      })
      .returning();
    const writingId = createdWriting.displayId;

    await trx.insert(usersToWritingTable).values({
      userId: userId,
      writingId: writingId,
    });

    return {
      id: writingId,
      name: createdWriting.name,
      description: createdWriting.description
        ? createdWriting.description
        : undefined,
    };
  });

  revalidatePath("/projects");

  return newWriting;
}


// export async function createProject(
//   name: Project["name"],
//   description?: Project["description"],
// ) {
//   // Check if user is logged in
//   const session = await auth();
//   const userId = session?.user?.id;
//   if (!userId) {
//     redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
//   }

//   // Validate input
//   try {
//     createProjectSchema.parse({
//       name: name,
//       description: description,
//     });
//   } catch (error) {
//     throw new Error(
//       "Project name is required and must be less than 100 chars.",
//     );
//   }

  

//   const newProject: Project = await db.transaction(async (trx) => {
//     const [createdProject] = await trx
//       .insert(projectsTable)
//       .values({
//         name: name,
//         description: description,
//       })
//       .returning();
//     const projectId = createdProject.displayId;

//     await trx.insert(usersToProjectsTable).values({
//       userId: userId,
//       projectId: projectId,
//     });

//     return {
//       id: projectId,
//       name: createdProject.name,
//       description: createdProject.description
//         ? createdProject.description
//         : undefined,
//     };
//   });

//   // Update the navbar for the user's projects
//   revalidatePath("/projects");

//   return newProject;
// }

// export async function getProjects(userId: User["id"]) {
//   const temp = await db.query.usersToProjectsTable.findMany({
//     where: eq(usersToProjectsTable.userId, userId),
//     with: {
//       project: {
//         columns: {
//           displayId: true,
//           name: true,
//         },
//       },
//     },
//   });

//   const projects: Omit<Project, "description">[] = temp.map((item) => ({
//     id: item.project.displayId,
//     name: item.project.name,
//   }));
//   return projects;
// }
