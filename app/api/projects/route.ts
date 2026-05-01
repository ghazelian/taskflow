import { NextResponse } from "next/server";

export async function GET() {
  const { prisma } = await import("@/lib/prisma");

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const { prisma } = await import("@/lib/prisma");

  const { name, color } = await request.json();

  const project = await prisma.project.create({
    data: { name, color },
  });

  return NextResponse.json(project, { status: 201 });
}