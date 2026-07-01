import { useNavigate } from "react-router-dom";
import "./App.css";

function NewFormSection() {

  const navigate = useNavigate();

  return (
    <section className="newform-section">

      <div className="newform-overlay"></div>

      <div className="newform-container">

        <div className="newform-content">

          <span className="newform-tag">
            FREE CONSULTATION
          </span>

          <h2>
            Want Clarity on Your Interior Budget?
            <br />
            <br />
          </h2>

          <p>
            Get personalized interior design guidance,
            budget planning, and project consultation
            from our experienced team.
          </p>

        </div>

        <div className="newform-card">

          <h3>
            Personalized Interior Design
            <br />
            Quote in 30 Seconds
          </h3>

          <span className="step-tag">
            STEP <span>1</span> OF 2
          </span>

          <div className="option-group">

            <h4>Your Floorplan</h4>

            <div className="option-grid">

              <button type="button">1 BHK</button>
              <button type="button">2 BHK</button>
              <button type="button">3 BHK</button>
              <button type="button">3+ BHK</button>

            </div>

          </div>

          <div className="option-group">

            <h4>Purpose</h4>

            <div className="option-grid">

              <button type="button">Move In</button>
              <button type="button">Rent Out</button>
              <button type="button">Renovate</button>

            </div>

          </div>

          <button
            type="button"
            className="estimate-btn"
            onClick={() => navigate("/estimate")}
          >
            Get Free Estimate
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
}

export default NewFormSection;