import "./App.css";

const clients = [
  "/log1.png",
  "/log2.png",
  "/log5.png",
  "/log4.png",
  "/log3.png",
  "/log6.png",
];

function Client() {
  return (
    <section className="client-section">

      <div className="client-glow"></div>

      <div className="client-header">

        <span className="client-tag">
          TRUSTED BY
        </span>

        <h2>
          Brands & Homeowners
          <br />
          Who Trust InspaceCraft
        </h2>

      </div>

      <div className="client-marquee">

        <div className="client-track">

          {[...clients, ...clients].map((logo, index) => (
            <div className="client-card" key={index}>
              <img src={logo} alt="client" />
            </div>
          ))}

        </div>

        <div className="client-track reverse">

          {[...clients, ...clients].map((logo, index) => (
            <div className="client-card" key={`reverse-${index}`}>
              <img src={logo} alt="client" />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Client;