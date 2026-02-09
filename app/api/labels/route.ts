import { NextResponse } from "next/server";
import { getLabels } from "@/lib/db";

export async function GET() {
  const labels = getLabels();
  return NextResponse.json(labels);
}
