import { Category, Status } from '@prisma/client';

export class NoteDto {
  title: string;
  content: string;
  archived = false;
  status = Status.ACTIVE;
  categories?: string[];
}

export class NotePatchDto {
  title?: string;
  content?: string;
  archived?: boolean;
  status?: Status;
  categories?: string[];
}

export class NoteResponse {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly title?: string;
  readonly content?: string;
  readonly archived?: boolean;
  readonly status?: Status;
  readonly categories?: Category[];

  constructor({
    id,
    createdAt,
    updatedAt,
    categories,
    archived,
    content,
    status,
    title,
  }: {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly title?: string;
    readonly content?: string;
    readonly archived?: boolean;
    readonly status?: Status;
    readonly categories?: Category[];
  }) {
    this.id = id;
    this.categories = categories;
    this.archived = archived;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.content = content;
    this.status = status;
    this.title = title;
  }
}
