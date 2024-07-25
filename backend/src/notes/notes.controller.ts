import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseBoolPipe,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note, Status } from '@prisma/client';
import { NoteDto, NotePatchDto, NoteResponse } from './note.entity.dto';
import { BadRequestException } from '@nestjs/common';
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('all')
  getNotes(
    @Query('archived', new ParseBoolPipe({ optional: true }))
    archived: boolean,
    @Query('status') status: string,
  ): Promise<Note[]> {
    if (!status) {
      return this.notesService.getAllNotes(archived, undefined);
    }
    return this.notesService.getAllNotes(archived, Status[status]);
  }

  @Get(':id')
  getNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.getNoteById(id);
  }

  @Put('categories/:id')
  addCategoryToNote(
    @Param('id') id: string,
    @Body('categories') categories: string[],
  ): Promise<NoteResponse> {
    if (!categories || categories.length === 0) {
      throw new BadRequestException('Categories are required');
    }
    return this.notesService.addCategoryToNoteById(id, categories);
  }

  @Patch('categories/:id')
  detachCategoryByNoteId(
    @Param('id') id: string,
    @Body('categories') categories: string[],
  ) {
    if (!categories || categories.length === 0) {
      throw new BadRequestException('Categories are required');
    }
    return this.notesService.detachCategoryToNoteById(id, categories);
  }

  @Post()
  async createNote(@Body() note: NoteDto): Promise<NoteResponse> {
    const createdNote = await this.notesService.createNote(note);
    if (note.categories) {
      return await this.notesService.addCategoryToNoteById(
        createdNote.id,
        note.categories,
      );
    }

    return createdNote;
  }

  @Patch(':id')
  updateNote(
    @Param('id') id: string,
    @Body() note: NotePatchDto,
  ): Promise<Note> {
    return this.notesService.updateNote(id, note);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.deleteNoteById(id);
  }
}
