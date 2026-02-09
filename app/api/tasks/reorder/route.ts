import { NextRequest, NextResponse } from "next/server";
import { reorderTasks } from "@/lib/db";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { updates } = body;

  if (!Array.isArray(updates)) {
    return NextResponse.json(
      { error: "updates array is required" },
      { status: 400 }
    );
  }

  reorderTasks(updates);
  return NextResponse.json({ success: true });
}
