import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function NewFormSection() {
  const navigate = useNavigate();

  const [floorplan, setFloorplan] = useState("");
  const [purpose, setPurpose] = useState("");

  return (
    <section className="newform-section">
      <div className="newform-overlay"></div>

      <div className="newform-container">
        <div className="newform-content">
          <span className="newform-tag">FREE CONSULTATION</span>

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

          {/* Floorplan */}
          <div className="option-group">
            <h4>Your Floorplan</h4>

            <div className="option-grid">
              {["1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map((plan) => (
                <button
                  key={plan}
                  type="button"
                  className={floorplan === plan ? "selected" : ""}
                  onClick={() => setFloorplan(plan)}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div className="option-group">
            <h4>Purpose</h4>

            <div className="option-grid">
              {["Move In", "Rent Out", "Renovate"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={purpose === item ? "selected" : ""}
                  onClick={() => setPurpose(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="estimate-btn"
            onClick={() =>
              navigate("/estimate", {
                state: {
                  floorplan,
                  purpose,
                },
              })
            }
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