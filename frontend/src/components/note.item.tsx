import { Note } from "../interfaces/note";
import { Link } from "react-router-dom";
import { useNotesStore, useNotesArchivedStore } from "../states/notes";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import axios from "axios";
import "./styles/notes.css";

const NoteItem = (note: Note) => {
  const deleteNoteState = useNotesStore((state) => state.deleteNote);
  const addNoteState = useNotesStore((state) => state.addNote);
  const addToArchivedNotes = useNotesArchivedStore((state) => state.addNote);
  const deleteArchivedNote = useNotesArchivedStore((state) => state.deleteNote);
  return (
    <div className="note-item">
      <div className="note-buttons">
        {note.archived ? (
          <button
            className="wrap-buttons"
            onClick={async () => {
              const updatedNote = await setArchived(note.id ?? "", false);
              deleteArchivedNote(updatedNote.id ?? "");
              addNoteState(updatedNote);
            }}
          >
            <UnarchiveIcon />
          </button>
        ) : (
          <button
            className="wrap-buttons"
            onClick={async () => {
              const updatedNote = await setArchived(note.id ?? "", true);
              deleteNoteState(updatedNote.id ?? "");
              addToArchivedNotes(updatedNote);
            }}
          >
            <ArchiveIcon />
          </button>
        )}
        {note.status === "INACTIVE" ? <p>Inactive Note</p> : <p>Active Note</p>}
      </div>
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        {note.categories && note.categories.length > 0 ? (
          <div>
            <h3>Categories</h3>
            <ul>
              {note.categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No categories</p>
        )}
      </div>

      <div className="note-buttons">
        <button
          onClick={async () => {
            await deleteNote(note.id ?? "");
            deleteNoteState(note.id ?? "");
            deleteArchivedNote(note.id ?? "");
          }}
        >
          Delete
        </button>
        <button>
          <Link className="link-update" to={"/update/" + note.id}>
            Update
          </Link>
        </button>
      </div>
    </div>
  );
};

const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:3000/notes/${id}`);
};

const setArchived = async (id: string, archived: boolean): Promise<Note> => {
  const response = await axios.patch(`http://localhost:3000/notes/${id}`, {
    archived: archived,
  });
  return response.data;
};

export default NoteItem;
