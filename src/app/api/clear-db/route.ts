import { NextResponse } from "next/server";

import { db } from "@/db";
import { projectsTable, tasksTable, usersTable } from "@/db/schema";

export const GET = async () => {
  try {
    const deletedProjects = await db.delete(projectsTable).returning();
    const deletedUsers = await db.delete(usersTable).returning();
    const deletedTasks = await db.delete(tasksTable).returning();
    console.log("Deleted Projects:", deletedProjects);
    console.log("Deleted Users: ", deletedUsers);
    console.log("Deleted Tasks: ", deletedTasks);

    return NextResponse.json(
      { message: "Database cleared successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error clearing the database:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
