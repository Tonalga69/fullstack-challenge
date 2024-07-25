import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Note } from "../interfaces/note";
import "./styles/form.css";
import { useNavigate } from "react-router-dom";
import CategoriesTagInput from "../components/categoriesTags";
import useTagsStore from "../states/tags";

export default function NewNoteForm() {
  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    content: "",
    archived: false,
    created_at: "",
    updated_at: "",
    status: "ACTIVE",
    categories: [],
  });
  const navigate = useNavigate();
  const tags = useTagsStore((state) => state.tags);
  const setTags = useTagsStore((state) => state.addTags);
  

  useEffect(() => {
    setTags([]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/notes/", {...note, categories: tags})
      .then((response) => {
        if (note.archived) {
          navigate("/archived");
        }
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: type === "checkbox" ? !prevNote.archived : value,
    }));
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div style={{}}>
      <Header></Header>
      <section className="container">
        <h2>Create note</h2>
        <form onSubmit={handleSubmit} className="" onKeyDown={handleKeyDown}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div style={{ justifyItems: "center" }}>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              required
              value={note.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="archived">Archived:</label>
            <input
              type="checkbox"
              id="archived"
              name="archived"
              checked={note.archived}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="active">Status:</label>
            <select
              id="status"
              name="status"
              value={note.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <CategoriesTagInput initialTags={tags}/>
          <button className="button" type="submit">
            Create Note
          </button>
        </form>
      </section>
    </div>
  );
}
