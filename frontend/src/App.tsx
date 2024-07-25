

import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Archived from "./pages/archived";
import UpdateNoteForm from "./pages/updateFormPage";
import NewNoteForm from "./pages/newNoteForm";
import ActiveNotes from "./pages/activeNotes";


function App() {


  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/update/:id"  element={<UpdateNoteForm />} />
        <Route path="/create" element={<NewNoteForm />} />
        <Route path="/active" element={<ActiveNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
