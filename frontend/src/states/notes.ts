import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Note } from "../interfaces/note";

interface NotesStore {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (note: Note) => void;
  addNotes: (notes: Note[]) => void;
}

const useNotesStore = create<NotesStore>()(
  devtools(
    persist(
      (set) => ({
        notes: [],
        addNote: (note: Note) =>
          set((state) => ({ notes: [...state.notes, note] })),
        deleteNote: (id: string) =>
          set((state) => ({
            notes: state.notes.filter((note) => note.id !== id),
          })),
        updateNote: (note: Note) =>
          set((state) =>{
            const index = state.notes.findIndex((n) => n.id === note.id);
            state.notes[index] = note;
            return { notes: state.notes };
          }),
        addNotes: (notes: Note[]) => set({ notes }),
      }),
      {
        name: "notes-store",
      }
    )
  )
);

const useNotesArchivedStore = create<NotesStore>()(
  devtools(
    persist(
      (set) => ({
        notes: [],
        addNote: (note: Note) =>
          set((state) => ({ notes: [...state.notes, note] })),
        deleteNote: (id: string) =>
          set((state) => ({
            notes: state.notes.filter((note) => note.id !== id),
          })),
        updateNote: (note: Note) =>
          set((state) =>{
            const index = state.notes.findIndex((n) => n.id === note.id);
            state.notes[index] = note;
            return { notes: state.notes };
          }),
        addNotes: (notes: Note[]) => set({ notes }),
      }),
      {
        name: "notes-store",
      }
    )
  )
);

export { useNotesStore, useNotesArchivedStore };


