import { useState } from "react";
import { FaYoutube ,FaInstagram, FaFacebookF } from "react-icons/fa";

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
              budget and vision together completely free.
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
            © 2026 InspaceCraft Interiors. All Rights Reserved.
          </p>

          <div className="footer-contact">
            <div className="footer-social">
  <a
    href="https://www.instagram.com/homelane_kokar_inspace/?utm_source=ig_web_button_share_sheet"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.facebook.com/61586924752571/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://youtube.com/@inspacecraft?si=neyc4ViSBJQNEL16"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    <FaYoutube />
  </a>
</div>

            <a
              href="mailto:inspacecraft@gmail.com"
              className="footer-link"
            >
              inspacecraft@gmail.com
            </a>

            <a
              href="tel:+919031800903"
              className="footer-link"
            >
              +91 9031800903
            </a>
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