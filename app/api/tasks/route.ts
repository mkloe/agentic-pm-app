import { NextRequest, NextResponse } from "next/server";
import { getTasks, createTask } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId") || undefined;
  const status = searchParams.get("status") || undefined;
  const priority = searchParams.get("priority") || undefined;

  const tasks = getTasks({ projectId, status, priority });
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, title } = body;

  if (!projectId || !title) {
    return NextResponse.json(
      { error: "projectId and title are required" },
      { status: 400 }
    );
  }

  const task = createTask({
    projectId,
    title,
    description: body.description || "",
    status: body.status || "todo",
    priority: body.priority || "medium",
    assigneeId: body.assigneeId || null,
    labels: body.labels || [],
    storyPoints: body.storyPoints || null,
    dueDate: body.dueDate || null,
    order: body.order || 0,
  });

  return NextResponse.json(task, { status: 201 });
}
