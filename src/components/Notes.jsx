import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote.jsx";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [showAddModal, setShowAddModal] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getNotes().catch(() => {
      navigate("/login");
    });
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note updated successfully", "success");
    refClose.current.click();
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-link text-decoration-none"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>

        <button
          className="btn btn-primary edit-btn rounded-pill"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Add a Note
        </button>
      </div>

      {/* Add Note Modal */}
      <div
        className={`modal fade ${showAddModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{
          background: showAddModal ? "rgba(0,0,0,0.3)" : "transparent",
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fs-5">➕ Add Note</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-4">
              <AddNote
                showAlert={props.showAlert}
                onSuccess={() => setShowAddModal(false)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Note Modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header border-0 pb-0">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                ✏️ Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body px-4">
              <form className="my-2" onSubmit={handleClick}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="etitle"
                    name="etitle"
                    minLength={3}
                    onChange={handleChange}
                    value={note.etitle}
                    placeholder="Title"
                    required
                  />
                  <label htmlFor="etitle">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="edescription"
                    name="edescription"
                    minLength={5}
                    onChange={handleChange}
                    value={note.edescription}
                    required
                    placeholder="Description"
                  />
                  <label htmlFor="edescription">Description</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="etag"
                    name="etag"
                    onChange={handleChange}
                    value={note.etag}
                    minLength={3}
                    required
                    placeholder="Tag (optional)"
                  />
                  <label htmlFor="etag">Tag</label>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary edit-btn rounded-pill"
                    ref={refClose}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-primary edit-btn rounded-pill"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 my-3">
        {notes.length === 0 && <p>No notes available</p>}
        {notes.map((note) => (
          <NoteItem
            note={note}
            key={note._id}
            updateNote={updateNote}
            showAlert={props.showAlert}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
