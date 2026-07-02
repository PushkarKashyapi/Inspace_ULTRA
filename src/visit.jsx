import { useState, useEffect, useRef } from "react";
import "./App.css";
import ConsultationCard from "./leadcard";

function Visit() {

  const [showForm, setShowForm] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  const visitRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {

      if (!visitRef.current || popupShown) return;

      const rect = visitRef.current.getBoundingClientRect();

      if (rect.top < 200) {

        setPopupShown(true);

        setTimeout(() => {
          setShowForm(true);
        }, 1000);

      }

    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [popupShown]);

  return (
    <>
      <section
        ref={visitRef}
        className="visit-section"
      >

        <div className="visit-grid"></div>

        <div className="visit-header">

          <span>EXPERIENCE CENTRE</span>

          <h2>
            Visit Our
            <br />
            Design Studio
          </h2>

          <p>
            Explore materials, finishes and layouts
            before bringing your dream space to life.
          </p>

        </div>

        <div className="visit-tabs">

          <button className="visit-tab active">
            Kokar Road
          </button>

        </div>

        <div className="visit-container">

          <div className="visit-image">

            <img
              src="/kitchen.jpg"
              alt="Showroom"
            />

          </div>

          <div className="visit-details">

            <div className="visit-mini-card">
  <span>Address</span>
  <p>
    <a
      href="https://share.google/CLm55SwR6MgOHWWuI"
      target="_blank"
      rel="noopener noreferrer"
      className="address-link"
    >
      2nd Floor Ekatvam Heights<br />
      Bhabha Nagar<br />
      Kokar Kantatoli Road
    </a>
  </p>
</div>

            <div className="visit-mini-card">
              <span>Hours</span>
              <p>
                11:00 AM
                <br />
                8:00 PM
              </p>
            </div>

            <div className="visit-mini-card">
              <span>Contact</span>
              <p>
                +91 9031800901
              </p>
            </div>

            <div className="visit-mini-card">
              <span>Facilities</span>
              <p>
               Interior architecture and decor 
                <br />
                Material Display
              </p>
            </div>

          </div>

        </div>

        <div className="visit-btn-wrap">

          <button
            className="visit-btn"
            onClick={() => setShowForm(true)}
          >
            Schedule A Visit
          </button>

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

export default Visit;