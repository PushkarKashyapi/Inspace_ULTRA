import "./App.css";

function Visit() {
  return (
    <section className="visit-section">

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
          kokar Road
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
              Harmu Road,
              Ranchi, Jharkhand
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
              +91 98765 43210
            </p>
          </div>

          <div className="visit-mini-card">
            <span>Facilities</span>
            <p>
              Parking • Consultation
              • Material Display
            </p>
          </div>

        </div>

      </div>

      <div className="visit-btn-wrap">

        <button className="visit-btn">
          Schedule A Visit
        </button>

      </div>

    </section>
  );
}

export default Visit;