import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import "../css/Login.css";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    setLoading(false);
    props.showAlert("Note added successfully", "success");
    if (props.onSuccess) props.onSuccess(); // Close modal on success
  };

  return (
    <form onSubmit={handleAddNote}>
      <div className="form-group">
        <input
          type="text"
          className="form-control input-animated"
          id="title"
          name="title"
          minLength={3}
          placeholder=" "
          onChange={handleChange}
          value={note.title}
          required
          disabled={loading}
        />
        <label htmlFor="title" className="form-label">
          Title
        </label>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control input-animated"
          id="description"
          name="description"
          minLength={5}
          placeholder=" "
          onChange={handleChange}
          value={note.description}
          required
          disabled={loading}
        />
        <label htmlFor="description" className="form-label">
          Description
        </label>
      </div>

      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control input-animated"
          id="tag"
          name="tag"
          minLength={3}
          placeholder=" "
          onChange={handleChange}
          value={note.tag}
          required
          disabled={loading}
        />
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-gradient w-100"
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Adding...
          </>
        ) : (
          "Add Note"
        )}
      </button>
    </form>
  );
};

export default AddNote;
