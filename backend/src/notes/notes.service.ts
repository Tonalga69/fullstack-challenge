import { Injectable } from '@nestjs/common';
import { Note, PrismaClient, Status } from '@prisma/client';
import { NoteDto, NotePatchDto, NoteResponse } from './note.entity.dto';
const prisma = new PrismaClient();

@Injectable()
export class NotesService {
  public async getAllNotes(archived: boolean, status: Status): Promise<Note[]> {
    if (!status) {
      return await prisma.note.findMany({
        where: {
          archived: archived,
        },
        include: {
          categories: true,
        },
      });
    }
    return await prisma.note.findMany({
      where: {
        archived: archived,
        status: status,
      },
      include: {
        categories: true,
      },
    });
  }

  public async searchNotesByCategory(
    categoryName: string,
  ): Promise<NoteResponse[]> {
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
      include: {
        notes: {
          include: {
            categories: true,
          },
        },
      },
    });

    return category.notes;
  }

  public async getNoteById(id: string): Promise<Note> {
    return await prisma.note.findUnique({
      where: {
        id: id,
      },
      include: {
        categories: true,
      },
    });
  }

  public async addCategoryToNoteById(
    noteId: string,
    category: string[],
  ): Promise<NoteResponse> {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        categories: {
          connectOrCreate: category.map((value) => {
            return {
              where: {
                name: value,
              },
              create: {
                name: value,
              },
            };
          }),
        },
      },
    });

    return await prisma.note.findUnique({
      where: {
        id: noteId,
      },
      include: {
        categories: true,
      },
    });
  }

  public async detachCategoryToNoteById(
    noteId: string,
    categories: string[],
  ): Promise<NoteResponse> {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        categories: {
          disconnect: categories.map((value) => {
            return {
              name: value,
            };
          }),
        },
      },
    });

    return await prisma.note.findUnique({
      where: {
        id: noteId,
      },
      include: {
        categories: true,
      },
    });
  }

  public async createNote(noteDto: NoteDto): Promise<Note> {
    return await prisma.note.create({
      data: {
        title: noteDto.title,
        content: noteDto.content,
        archived: noteDto.archived,
        status: noteDto.status,
      },
    });
  }
  public async updateNote(
    noteId: string,
    noteDto: NotePatchDto,
  ): Promise<Note> {
    return await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: noteDto.title,
        content: noteDto.content,
        archived: noteDto.archived,
        status: noteDto.status,
      },
    });
  }

  public async deleteNoteById(noteId: string): Promise<Note> {
    return await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
