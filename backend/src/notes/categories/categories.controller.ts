import { Controller, Get } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  public getAllNoteCategories(): Promise<Category[]> {
    return this.categoriesService.getAllNoteCategories();
  }
}
