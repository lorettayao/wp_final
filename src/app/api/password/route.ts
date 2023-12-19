import { NextResponse } from "next/server";

import { db } from "@/db";

// GET /api/password/:email
export async function GET() {
  try {
    const users = await db.query.usersTable.findMany({});

    return NextResponse.json(
      {
        password: users[0]?.hashedPassword || "",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
