import "./App.css";
import { useState } from "react";
import EstCard from "./estcar";
import ConsultationCarder from "./estercard";
import Navbar from "./navbar";
import Feet from "./feet"
function Estimate() {

  const [showForm, setShowForm] = useState(true);

  return (
    <>

      {showForm && (

        <div className="estimate-modal">

          <div className="estimate-modal-card">

            <ConsultationCarder
              onSuccess={() => setShowForm(false)}
            />

          </div>

        </div>

      )}

      <div className={showForm ? "estimate-blur" : ""}>

        <Navbar/>

        <section className="estimate-section">

          <div className="estimate-container">

            <h2 className="estimate-title">
              Your Estimate for 3 Lifestyle Options
            </h2>

            <div className="estimate-card">

              <div className="estimate-top">

                <div className="estimate-item">

                  <img
                    src="/bed53.png"
                    alt="Kitchen"
                  />

                  <div>
                    <h3>Kitchen</h3>
                    <span>( Included )</span>
                  </div>

                </div>

                <div className="estimate-divider"></div>

                <div className="estimate-item">

                  <img
                    src="/bed30.png"
                    alt="Wardrobe"
                  />

                  <div>
                    <h3>Wardrobes</h3>
                    <span>( 0 Units )</span>
                  </div>

                </div>

                <div className="estimate-divider"></div>

                <div className="estimate-item">

                  <img
                    src="/bed36.png"
                    alt="Other"
                  />

                  <div>
                    <h3>Other Interiors</h3>
                    <span>( 3 Units )</span>
                  </div>

                </div>

              </div>

              <div className="estimate-bottom">

                <div className="estimate-info">

                  <strong>WHAT'S INCLUDED:</strong>

                  Kitchen, 3 Other Interiors

                  <small>
                    (Get a price closer to your requirement by changing the details)
                  </small>

                </div>

                <button className="edit-btn">
                  EDIT
                </button>

              </div>

            </div>

            <button className="modify-btn">
              Modify Requirements →
            </button>

          </div>

        </section>

        <EstCard />

        <Feet />

      </div>

    </>
  );
}

export default Estimate;