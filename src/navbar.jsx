import { useState } from "react";
import "./App.css";
import ConsultationCard from "./leadcard";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <span className="black">Inspace</span>
          <span className="red">Craft</span>
        </div>

        <ul className="nav-links"></ul>

        <button
          className="consult-btn"
          onClick={() => setShowForm(true)}
        >
          Free Consultation
        </button>
      </nav>

      {showForm && (
        <div
          className="popup-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="popup-close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <ConsultationCard
              closeForm={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;