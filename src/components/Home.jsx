import Notes from "./Notes.jsx";

const Home = (props) => {
  return (
    <div className="container my-5">
      <div
        className="bg-light p-4 rounded-4 shadow-sm mb-5 text-center animate__animated animate__fadeInDown"
        style={{
          animationDuration: "1s",
        }}
      >
        <h1
          className="fw-bold text-primary mb-2 animate__animated animate__fadeIn"
          style={{ animationDelay: "0.2s", animationDuration: "1.2s" }}
        >
          <span role="img" aria-label="notebook">
            📓
          </span>{" "}
          Welcome to <span className="text-gradient">iNoteBook</span>
        </h1>
        <p
          className="text-muted fs-5 animate__animated animate__fadeInUp"
          style={{ animationDelay: "0.5s", animationDuration: "1.2s" }}
        >
          Securely store, update, and manage your notes in one place.
          <br />
          <span className="fw-semibold text-dark">
            Start by adding a new note or editing an existing one below.
          </span>
        </p>
        <div
          className="d-flex justify-content-center mt-4 animate__animated animate__fadeInUp"
          style={{ animationDelay: "0.8s", animationDuration: "1.2s" }}
        >
          <span
            className="badge bg-gradient-pill text-light px-4 py-2"
            style={{
              background:
                "linear-gradient(90deg,#2563eb,#1e40af,#22c55e,#16a34a)",
              fontSize: "1.1rem",
              letterSpacing: "0.03em",
              borderRadius: "2rem",
              boxShadow: "0 2px 12px #0001",
            }}
          >
            🚀 Fast • 🔒 Secure • 🌙 Beautiful
          </span>
        </div>
      </div>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
