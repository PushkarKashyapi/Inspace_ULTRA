import "./App.css";

const clients = [
  "/client_1.webp",
  "/client2.webp",
  "/client3.png",
  "/client4.webp",
  "/client2.webp",
  "/client3.png",
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