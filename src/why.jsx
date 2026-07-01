import { useEffect, useState } from "react";
import "./App.css";
import ConsultationCard from "./leadcard";

function Why() {

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    const cards = document.querySelectorAll(".why-card");

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }

        });

      },
      {
        threshold: 0.2,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();

  }, []);

  return (
    <>
      <section className="why-section">

        <h2 className="why-title">
          Why Choose InspaceCraft
        </h2>

        <div className="why-layout">

          <div className="stack-container">

            <div className="why-card card-1">
              <div className="card-number">01</div>

              <h3>Dream</h3>

              <p>
                We understand your vision,
                lifestyle and aspirations.
              </p>
            </div>

            <div className="why-card card-2">
              <div className="card-number">02</div>

              <h3>Design</h3>

              <p>
                Concepts transformed into
                elegant and functional spaces.
              </p>
            </div>

            <div className="why-card card-3">
              <div className="card-number">03</div>

              <h3>Deliver</h3>

              <p>
                Precision execution with
                complete transparency.
              </p>
            </div>

          </div>

          <div className="why-image">
            <img
              src="/zero_2.png"
              alt="Interior Expert"
            />
          </div>

        </div>

        <div className="why-btn-wrap">

          <button
            className="why-btn"
            onClick={() => setShowForm(true)}
          >
            Book Free Consultation
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

export default Why;