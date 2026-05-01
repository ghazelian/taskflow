import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const projectId = Number(id);

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const projectId = Number(id);
  const body = await request.json();

  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      name: body.name,
      color: body.color,
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const projectId = Number(id);

  await prisma.project.delete({
    where: { id: projectId },
  });

  return NextResponse.json({ message: "Project deleted" });
}
