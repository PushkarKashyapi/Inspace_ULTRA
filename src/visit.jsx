import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
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
      <section ref={visitRef} className="visit-section">
        <div className="visit-grid"></div>

        <div className="visit-header">
          <span>EXPERIENCE CENTRE</span>

          <h2>
            Visit Our
            <br />
            Design Studio
          </h2>

          <p>
            Explore materials, finishes and layouts before bringing your dream
            space to life.
          </p>
        </div>

        <div className="visit-tabs">
          <a
            href="https://www.google.com/maps/dir/InspaceCraft,+Homelane+Building,+chowk,+beside+Yamaha+Showroom,+near+kokar,+Shanti+Nagar,+Ranchi,+Jharkhand+834001/InspaceCraft,+Homelane+Building,+chowk,+beside+Yamaha+Showroom,+near+kokar,+Shanti+Nagar,+Ranchi,+Jharkhand+834001/@23.3742803,85.3604423,15.74z/data=!4m13!4m12!1m5!1m1!1s0x39f4e3e0d20ea71b:0xdd9e80021de8fa58!2m2!1d85.3567297!2d23.3745882!1m5!1m1!1s0x39f4e3e0d20ea71b:0xdd9e80021de8fa58!2m2!1d85.3567297!2d23.3745882?hl=en_GB&entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="visit-tab-link"
          >
            <button className="visit-tab active">
              📍 Kokar Road
            </button>
          </a>
        </div>

        <div className="visit-container">
          <div className="visit-image">
            <img src="/kitchen.jpg" alt="Showroom" />
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
                  2nd Floor Ekatvam Heights
                  <br />
                  Bhabha Nagar
                  <br />
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
                <a
                  href="tel:+919031800901"
                  className="address-link"
                >
                  +91 9031800901
                </a>
              </p>
            </div>

            <div className="visit-mini-card">
              <span>Facilities</span>

              <p>
                Interior Architecture & Decor
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

      {/* Floating WhatsApp Button */}

      <a
        href="https://wa.me/919031800901?text=Hi%20InspaceCraft,%20I'm%20interested%20in%20your%20interior%20design%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>

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