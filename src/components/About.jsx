import React from "react";

const About = () => {
  return (
    <div className="container my-5 p-4 shadow rounded-4 bg-light">
      <h2 className="mb-3 fw-bold text-primary text-center">
        📘 About <span className="text-gradient">iNoteBook</span>
      </h2>
      <p className="text-muted fs-5 text-center">
        <span className="fw-semibold text-dark">iNoteBook</span> is your modern,
        fast, and secure note-taking companion built with the <b>MERN stack</b>.
        Effortlessly capture, organize, and access your thoughts and ideas from
        anywhere, on any device.
      </p>
      <hr />
      <h4 className="fw-semibold text-dark mt-4 text-center">
        💡 Why Choose iNoteBook?
      </h4>
      <div className="row justify-content-center">
        <ul className="list-group list-group-flush mb-3 col-md-8">
          <li className="list-group-item border-0">
            <span className="me-2">📝</span>
            <b>Create, update, and delete notes</b> with ease
          </li>
          <li className="list-group-item border-0">
            <span className="me-2">🔐</span>
            <b>Secure authentication</b> using cookies & JWT
          </li>
          <li className="list-group-item border-0">
            <span className="me-2">📂</span>
            <b>Organize notes</b> with tags and categories
          </li>
          <li className="list-group-item border-0">
            <span className="me-2">🌙</span>
            <b>Beautiful, responsive UI</b> with React & Bootstrap
          </li>
          <li className="list-group-item border-0">
            <span className="me-2">☁️</span>
            <b>Access anywhere</b> — your notes are always with you
          </li>
        </ul>
      </div>
      <div className="alert alert-info text-center mt-4 rounded-3 shadow-sm">
        <b>Tip:</b> Try creating a note, tagging it, and see how easy it is to
        stay organized!
      </div>
      <hr />
      <p className="mt-4 text-secondary text-center">
        Whether you’re a developer, student, or professional,
        <br />
        <span className="fw-semibold text-primary">iNoteBook</span> helps you
        organize your digital thoughts — simply and securely.
      </p>
    </div>
  );
};

export default About;
