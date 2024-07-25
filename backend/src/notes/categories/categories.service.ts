import { Injectable } from '@nestjs/common';
import { Category, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class CategoriesService {
  async getAllNoteCategories(): Promise<Category[]> {
    return await prisma.category.findMany({});
  }
}
