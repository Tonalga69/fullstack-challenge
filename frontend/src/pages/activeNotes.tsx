import Header from "../components/header";
import NotesContainer from "../components/notes.container";



export default function ActiveNotes() {
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
                <h2>Active Notes</h2>
            </section>
            <NotesContainer status="ACTIVE" />
        </div>
    )
}