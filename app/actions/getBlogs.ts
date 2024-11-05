// actions/getBlogs.ts

import { Blog } from '@prisma/client'; // Ensure you import your Blog type from Prisma
import prisma from '../lib/prismadb';

export default async function getBlogs(): Promise<(Blog & { createdAt: Date })[]> {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc', // Ensure your Prisma model has a createdAt field
      },
    });

    // Directly return the blogs without mapping since createdAt remains a Date
    return blogs; 
  } catch (err: unknown) {
    console.error('Error fetching blogs:', err instanceof Error ? err.message : err); // Enhanced logging
    throw new Error('Could not fetch blogs. Please try again later.'); // User-friendly error
  }
}
