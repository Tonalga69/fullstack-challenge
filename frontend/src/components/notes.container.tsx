import { useEffect } from "react";
import { useNotesStore } from "../states/notes";
import useCategoriesStore from "../states/categories";
import NoteItem from "./note.item";
import axios from "axios";
import Filter from "./filter";

export default function NotesContainer({
  archived,
  status,
}: {
  archived?: boolean;
  status?: "ACTIVE" | "INACTIVE";
}) {
  const notes = useNotesStore((state) => state.notes);
  const setNotes = useNotesStore((state) => state.addNotes);
  const selectedCategory = useCategoriesStore(
    (state) => state.selectedCategory
  );

  useEffect(() => {
    let url = "http://localhost:3000/notes/all?";
    if (archived !== undefined) {
      url += "archived=" + archived;
    }
    if (status) {
      url += "&status=" + status;
    }
    axios
      .get(url)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <Filter /> 
      <div className="grid-container">
        {selectedCategory
          ? notes
              .filter((note) => note.categories.map((category) => category.name).includes(selectedCategory.name))
              .map((note) => (
                <NoteItem
                  archived={note.archived}
                  content={note.content}
                  created_at={note.created_at}
                  id={note.id}
                  status={note.status}
                  title={note.title}
                  updated_at={note.updated_at}
                  categories={note.categories}
                />
              ))
          : notes.map((note) => (
              <NoteItem
                archived={note.archived}
                content={note.content}
                created_at={note.created_at}
                id={note.id}
                status={note.status}
                title={note.title}
                updated_at={note.updated_at}
                categories={note.categories}
              />
            ))}
      </div>
    </div>
  );
}
