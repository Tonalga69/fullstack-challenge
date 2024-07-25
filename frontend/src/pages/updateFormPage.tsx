import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Category, Note } from "../interfaces/note";
import "./styles/form.css";
import { useNavigate } from "react-router-dom";
import CategoriesTagInput from "../components/categoriesTags";
import useTagsStore from "../states/tags";

export default function UpdateNoteForm() {
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

  const tags = useTagsStore((state) => state.tags);
  const setTags = useTagsStore((state) => state.addTags);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch("http://localhost:3000/notes/" + id)
        .then((response) => response.json())
        .then((data) => {
          setNote(data);
          setTags([
            ...data.categories.map((category: Category) => category.name),
          ]);
        });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .patch("http://localhost:3000/notes/" + id, note)
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
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div>
      <Header></Header>
      <section className="container">
        <h2>Update note</h2>
        <form onSubmit={handleSubmit} className="" onKeyDown={handleKeyDown}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div style={{ justifyItems: "center" }}>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
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
          <div style={{ height: 30 }}></div>
          <label htmlFor="categories">Categories:</label>
          <CategoriesTagInput initialTags={tags} id={note.id}/>
          <button className="button" type="submit">
            Update Note
          </button>
        </form>
      </section>
    </div>
  );
}
