import { useState } from "react";
import "./App.css";
import ConsultationCard from "./leadcard";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
        <nav className="navbar">
  <div className="logo">
    <img src="/LogoInspace.png" alt="InspaceCraft" className="logo-img" />
  </div>
        <ul className="nav-links">
          <li><a href="/studio/index.html">Design Studio</a></li>
          <li><a href="/studio/index.html#compare">Packages</a></li>
          <li><a href="/studio/index.html#offers">Offers</a></li>
        </ul>

        <a className="studio-mobile-link" href="/studio/index.html">Design Studio</a>

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