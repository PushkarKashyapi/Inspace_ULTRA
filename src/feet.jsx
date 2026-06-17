import "./App.css";

function Feet() {
  return (
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
            budget and vision together — completely free.
          </p>

          <button className="feet-btn">
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

          <span>hello@inspacecraft.com</span>

          <span>1800-102-4663</span>

        </div>

      </div>

    </section>
  );
}

export default Feet;