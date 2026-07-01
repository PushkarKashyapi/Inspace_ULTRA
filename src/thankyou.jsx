import "./App.css";

function Thankyou() {
  return (
    <section className="thankyou-section">

      <div className="thankyou-hero">

        <div className="thankyou-icon">
          ✓
        </div>

        <h1>
          Thank You!
        </h1>

        <p>
          Your consultation request has been submitted successfully.
          <br />
          Our design team has received your details.
        </p>

      </div>

      <div className="thankyou-card">

        <div className="thankyou-content">

          <h3>
            Our Team Will Contact You Soon
          </h3>

          <p>
            One of our interior design experts will get in touch with you
            shortly to understand your requirements and schedule your free
            consultation.
          </p>

        </div>

        <button
          className="thankyou-btn"
          onClick={() => (window.location.href = "/")}
        >
          Back To Home
        </button>

      </div>

    </section>
  );
}

export default Thankyou;