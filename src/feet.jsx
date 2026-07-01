import { useState } from "react";
import "./App.css";
import ConsultationCard from "./leadcard";

function Feet() {

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="feet-section">

        <div className="feet-grid"></div>

        <div className="feet-container">

          <div className="feet-content">

            <span className="feet-tag">
              FREE DESIGN CONSULTATION
            </span>

            <h2>
              Confused Between Styles,
              Layouts, and Costs?
            </h2>

            <p>
              Meet a designer who'll bring your ideas,
              budget and vision together  completely free.
            </p>

            <button
              className="feet-btn"
              onClick={() => setShowForm(true)}
            >
              Meet A Designer
            </button>

          </div>

          <div className="feet-image">

            <img
              src="/new_1.png"
              alt="Designer"
            />

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 InspaceCraft Interiors.
            All Rights Reserved.
          </p>

          <div className="footer-contact">

            <span>inspacecraft@gmail.com</span>

            <span>+91 9031800901</span>

          </div>

        </div>

      </section>

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
}

export default Feet;