import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../css/NoteStyles.css"; // Assuming you have styles for NoteItem

const NoteItem = ({ note, updateNote, showAlert }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const handleDelete = () => {
    // ...existing modal code...
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.25); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div style="
          background: #fff; border-radius: 16px; box-shadow: 0 8px 32px #0002; padding: 32px 28px; max-width: 340px; text-align: center;">
          <div style="font-size: 2.5rem; color: #ef4444; margin-bottom: 10px;">🗑️</div>
          <h5 style="font-weight: bold; color: #b91c1c;">Delete Note?</h5>
          <p style="color: #444; margin-bottom: 24px;">Are you sure you want to delete this note? This action cannot be undone.</p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="cancelDelete" style="padding: 8px 20px; border-radius: 6px; border: none; background: #e5e7eb; color: #222; font-weight: 500;">Cancel</button>
            <button id="confirmDelete" style="padding: 8px 20px; border-radius: 6px; border: none; background: linear-gradient(90deg,#ef4444,#b91c1c); color: #fff; font-weight: 500;">Delete</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#cancelDelete").onclick = () =>
      document.body.removeChild(modal);
    modal.querySelector("#confirmDelete").onclick = () => {
      deleteNote(note._id);
      showAlert("Note deleted successfully", "success");
      document.body.removeChild(modal);
    };
  };

  return (
    <div className="col-12 col-md-6 col-lg-3 my-3 d-flex">
      <div
        className="card note-card shadow-sm border-0 rounded-4 p-3 w-100"
        style={{
          minHeight: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="card-body p-0 d-flex flex-column h-100">
          <h5 className="card-title d-flex justify-content-between align-items-start">
            <span className="text-truncate" style={{ maxWidth: "70%" }}>
              {note.title}
            </span>
            <span className="note-actions d-flex gap-2">
              <FaTrash
                onClick={handleDelete}
                className="icon-hover text-danger"
                role="button"
                title="Delete"
              />
              <FaEdit
                onClick={() => updateNote(note)}
                className="icon-hover text-primary"
                role="button"
                title="Edit"
              />
            </span>
          </h5>
          <p
            className="card-text mb-2"
            style={{ flex: 1, minHeight: "60px", wordBreak: "break-word" }}
          >
            {note.description}
          </p>
          <span className="badge bg-gradient-pill text-light align-self-start">
            {note.tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
