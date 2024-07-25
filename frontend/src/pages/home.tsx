import Header from "../components/header";
import NotesContainer from "../components/notes.container";

export default function Home() {
  return (
    <div className="App">
      <Header />
      <section style={
                {
                    display: "flex",
                    flex: 2,
                    flexDirection: "row",
                    margin: "0.5rem",
                    justifyContent: "center",
                    color: "white"
                }
            }>
                <h2>Home</h2>
            </section>
      <NotesContainer archived={false} />
    </div>
  );
}
