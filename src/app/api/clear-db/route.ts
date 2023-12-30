import { NextResponse } from "next/server";

import { db } from "@/db";
import { projectsTable, usersTable } from "@/db/schema";

export const GET = async () => {
  try {
    const deletedProjects = await db.delete(projectsTable).returning();
    const deletedUsers = await db.delete(usersTable).returning();
    console.log("Deleted Projects:", deletedProjects);
    console.log("Deleted Users: ", deletedUsers);

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
