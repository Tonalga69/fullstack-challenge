import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="App-header">
      <section
        style={{
          display: "flex",
          flex: 2,
          flexDirection: "row",
          margin: "2rem",
          justifyContent: "start",
        }}
      >
        <h1>Notes</h1>
      </section>
      <section className="routes">
        
        <Link className="link" to="/create">
          New
        </Link>
        <Link className="link" to="/">
          My Notes
        </Link>
        <Link className="link" to="/archived">
          Archived
        </Link>
        <Link className="link" to="/active">
         Active Notes
        </Link>
      </section>
    </header>
  );
}
