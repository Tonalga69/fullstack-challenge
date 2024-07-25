import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [CategoriesModule],
})
export class NotesModule {}
