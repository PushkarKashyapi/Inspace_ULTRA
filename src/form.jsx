import "./App.css";

function FormSection() {
  return (
    <section className="form-section">

      <div className="form-overlay"></div>

      <div className="form-container">

        <div className="form-content">

          <span className="form-tag">
            FREE CONSULTATION
          </span>

          <h2>
            600+ Expert Designers,
            <br />
            Ready To Design
            <br />
            Your Dream Space.
          </h2>

          <p>
            Get personalized interior design guidance,
            budget planning, and project consultation
            from our experienced team.
          </p>

        </div>

        <div className="consultation-card">

          <div className="icon-circle">
            
          </div>

          <h3>Book A Free Consultation</h3>

          <p>
            Schedule a meeting with our interior experts
            and start your transformation journey.
          </p>

          <form className="consultation-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="tel"
              placeholder="Phone Number"
            />

            <textarea
              placeholder="Tell us about your project"
              rows="4"
            ></textarea>

            <button type="submit">
              Schedule Now
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default FormSection;