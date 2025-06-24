import {type Context } from 'hono';
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();



export const getAllSkillsController = async (c: Context): Promise<Response> => {
  try {
    const skills = await prisma.skill.findMany({
      select: {
        id: true,
        name: true,
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return c.json({
      success: true,
      data: skills,
      count: skills.length,
      message: skills.length ? 'Skills fetched successfully' : 'No skills found',
    });
  } catch (error) {
    console.error('[SKILLS_FETCH_ERROR]', {
      error: error instanceof Error ? error.message : String(error),
    });

    return c.json(
      {
        success: false,
        message: 'An error occurred while fetching skills.',
        code: 'SKILLS_FETCH_ERROR',
      },
      500
    );
  }
};