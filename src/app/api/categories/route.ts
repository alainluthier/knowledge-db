import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// Action to read
export const GET = async (req: NextRequest) => {
    const categories = await prisma.category.findMany({});
  
    return NextResponse.json({
        categories,
    });
  };

// Action to create
export const POST = async (req: NextRequest) => {
    const { category, description } = await req.json();
  
    const cat = await prisma.category.create({
      data: {
        category,
        description,
      },
    });
  
    return NextResponse.json({
        cat,
    });
  };