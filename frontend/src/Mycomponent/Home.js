import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AddNoteForm from "./AddNoteForm";
import axios from "axios";
import NoteCard from "./NoteCard";

export default function Home({}) {
  const [noteMode, setNoteMode] = useState(false);
  const [notes, setNote] = useState([]);
  const [Currentnotes, setCurrentNote] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleClick = () => {
    setCurrentNote(null);
    setNoteMode(true);
  };

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.task.toLowerCase().includes(query.toLowerCase()) ||
          note.desc.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const Fetchnotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        setNote(response.data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("useeff");
    Fetchnotes();
  }, []);

  const isEdit = (note) => {
    console.log(Currentnotes);
    setCurrentNote(note);
    setNoteMode(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className="px-8 pt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              isEdit={isEdit}
              Fetchnotes={Fetchnotes}
            />
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
      <button
        className="fixed right-4 bottom-4 text-3xl bg-teal-500 text-white font-bold p-5 rounded-full"
        onClick={handleClick}
      >
        +
      </button>

      {noteMode && (
        <AddNoteForm
          setNoteMode={setNoteMode}
          noteMode={noteMode}
          Fetchnotes={Fetchnotes}
          Currentnotes={Currentnotes}
        />
      )}
    </div>
  );
}
