import { useState } from "react";
import NoteContext from "./NoteContext";
import axios from "../../api/axiosInstance.jsx";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const getNotes = async () => {
    try {
      const response = await axios.get("/notes/fetchallnotes");
      setNotes(response.data);
    } catch (error) {
      props.showAlert && props.showAlert("Failed to fetch notes", "danger");
    }
  };

  // Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const response = await axios.post("/notes/addnote", {
        title,
        description,
        tag,
      });
      setNotes(notes.concat(response.data));
    } catch (error) {
      props.showAlert && props.showAlert("Failed to add note", "danger");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/notes/deletenote/${id}`);
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      props.showAlert && props.showAlert("Failed to delete note", "danger");
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      await axios.put(`/notes/updatenote/${id}`, { title, description, tag });

      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      props.showAlert && props.showAlert("Failed to update note", "danger");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
