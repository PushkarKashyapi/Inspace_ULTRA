import "./App.css";

const services = [
  {
    name: "Crokery Unit",
    icon: "/bed21.png",
  },
  {
    name: "Furnitures",
    icon: "/bed22.png",
  },
  {
    name: "kids Bedroom",
    icon: "/bed28.png",
  },
  {
    name: "Movable Furniture",
    icon: "/bed30.png",
  },
  {
    name: "Foyer designs",
    icon: "/bed32.png",
  },

  {
    name: "Pooja Unit",
    icon: "/bed34.png",
  },
  {
    name: "Tv Interior",
    icon: "/bed36.png",
  },
  {
    name: "Bedroom",
    icon: "/bed37.png",
  },
  {
    name: "Wall Paint",
    icon: "/bed40.png",
  },
  {
    name: "Kitchen Units",
    icon: "/bed21.png",
  },

  {
    name: "WallPaper",
    icon: "/bed42.png",
  },
  {
    name: "Lights",
    icon: "/bed44.png",
  },
  {
    name: "Ceiling",
    icon: "/bed47.png",
  },
  {
    name: "Study Table",
    icon: "/bed51.png",
  },
  {
    name: "Kitchen",
    icon: "/bed53.png",
  },
];

function Interior() {
  return (
    <section className="interior-section">

      <div className="interior-glow"></div>

      <h2 className="interior-title">
        End-to-End Interior Solutions
      </h2>

      <div className="interior-grid">

        {services.map((item, index) => (
          <div
            className="interior-item"
            key={index}
          >
            <img
              src={item.icon}
              alt={item.name}
            />

            <p>{item.name}</p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Interior;