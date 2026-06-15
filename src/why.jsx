function Why() {
  return (
    <section className="why-section">

      <h2 className="why-title">
        Why Choose InspaceCraft
      </h2>

      <div className="why-layout">

        {/* LEFT CARDS */}

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

        {/* RIGHT IMAGE */}

        <div className="why-image">

          <img
            src="/why_real.png"
            alt="Interior Expert"
          />

        </div>

      </div>

    </section>
  );
}

export default Why;