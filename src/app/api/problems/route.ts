import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Action to read
export const GET = async (req: NextRequest) => {
    const problems = (await prisma.problem.findMany({
      where: {
      },
      include: {
        category: true, 
      },
    }))
  
    return NextResponse.json({
      problems,
    });
  };

// Action to create
export const POST = async (req: NextRequest) => {
    const { problem, solution,categoryId } = await req.json();
  
    const pro = await prisma.problem.create({
      data: {
        problem,
        solution,
        categoryId
      },
    });
  
    return NextResponse.json({
      pro,
    });
  };