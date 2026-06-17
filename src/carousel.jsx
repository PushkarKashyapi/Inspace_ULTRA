import { useState } from "react";
import "./App.css";

const rows = [
  {
    title: "Modular Kitchens",
    reverse: false,
    projects: [
      { image: "/img1.jpg", title: "Luxury Kitchen Design" },
      { image: "/img2.jpg", title: "Modern Storage Kitchen" },
      { image: "/img3.jpg", title: "Premium Island Kitchen" },
      { image: "/img4.jpg", title: "Open Concept Kitchen" },
    ],
  },
  {
    title: "Living Rooms",
    reverse: true,
    projects: [
      { image: "/img1.jpg", title: "Contemporary Living Space" },
      { image: "/img2.jpg", title: "Minimal Luxury Lounge" },
      { image: "/img3.jpg", title: "Elegant Family Room" },
      { image: "/img4.jpg", title: "TV Unit Showcase" },
    ],
  },
  {
    title: "Bedrooms",
    reverse: false,
    projects: [
      { image: "/img3.jpg", title: "Floor To Ceiling Wardrobe" },
      { image: "/img4.jpg", title: "Bay Window Bedroom" },
      { image: "/img1.jpg", title: "Luxury Master Suite" },
      { image: "/img2.jpg", title: "Modern Bedroom Design" },
    ],
  },
  {
    title: "Wardrobes & Storage",
    reverse: true,
    projects: [
      { image: "/img2.jpg", title: "Sliding Wardrobe" },
      { image: "/img1.jpg", title: "Walk In Closet" },
      { image: "/img4.jpg", title: "Storage Wall System" },
      { image: "/img3.jpg", title: "Luxury Wardrobe Unit" },
    ],
  },
];

function CarouselRow({ row }) {
  const [projects, setProjects] = useState(
    Array(10).fill(row.projects).flat()
  );

  const nextSlide = () => {
    setProjects((prev) => {
      const updated = [...prev];

      const first = updated.shift();

      updated.push(first);

      return updated;
    });
  };

  const prevSlide = () => {
    setProjects((prev) => {
      const updated = [...prev];

      const last = updated.pop();

      updated.unshift(last);

      return updated;
    });
  };

  return (
    <div className="carousel-row">

      <div className="row-header">

        <h3>{row.title}</h3>

        <div className="row-controls">

          <button onClick={prevSlide}>
            ←
          </button>

          <button onClick={nextSlide}>
            →
          </button>

        </div>

      </div>

      <div className="carousel-track-wrapper">

        <div
          className={`carousel-track ${
            row.reverse ? "reverse" : ""
          }`}
        >

          {projects.map((project, index) => (

            <div
              className="project-card"
              key={index}
            >

              <img
                src={project.image}
                alt={project.title}
              />

              <h4>
                {project.title}
              </h4>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

function Carousel() {
  return (
    <section className="carousel-section">

      <div className="carousel-header">

        <span>
          FEATURED PROJECTS
        </span>

        <h2>
          End-to-End Interiors
          Delivered Seamlessly
        </h2>

      </div>

      {rows.map((row, index) => (

        <CarouselRow
          key={index}
          row={row}
        />

      ))}

      <div className="carousel-cta">

        <button className="carousel-btn">
          Call Our Experts
        </button>

      </div>

    </section>
  );
}

export default Carousel;