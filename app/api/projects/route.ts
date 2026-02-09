import { NextRequest, NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/db";

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, key } = body;

  if (!name || !key) {
    return NextResponse.json(
      { error: "Name and key are required" },
      { status: 400 }
    );
  }

  const project = createProject({ name, description: description || "", key });
  return NextResponse.json(project, { status: 201 });
}
