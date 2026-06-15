import "./App.css";

const services = [
  {
    name: "Modular Kitchen",
    icon: "/kitchen.svg",
  },
  {
    name: "Storage & Wardrobe",
    icon: "/ward1.svg",
  },
  {
    name: "Crockery Units",
    icon: "/ward2.svg",
  },
  {
    name: "Space Saving Furniture",
    icon: "/ward3.svg",
  },
  {
    name: "TV Units",
    icon: "/ward4.svg",
  },

  {
    name: "Study Tables",
    icon: "/ward2.svg",
  },
  {
    name: "False Ceiling",
    icon: "/ward4.svg",
  },
  {
    name: "Lights",
    icon: "/ward4.svg",
  },
  {
    name: "Wallpaper",
    icon: "/ward1.svg",
  },
  {
    name: "Wall Paint",
    icon: "/ward3.svg",
  },

  {
    name: "Bathroom",
    icon: "/ward1.svg",
  },
  {
    name: "Pooja Unit",
    icon: "/ward4.svg",
  },
  {
    name: "Foyer Designs",
    icon: "/ward3.svg",
  },
  {
    name: "Movable Furniture",
    icon: "/ward1.svg",
  },
  {
    name: "Kids Bedroom",
    icon: "/ward2.svg",
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