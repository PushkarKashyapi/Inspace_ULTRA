import { useState, useEffect, useRef } from "react";
import "./App.css";
import ConsultationCard from "./leadcard";

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
      { image: "/hall.png", title: "Contemporary Living Space" },
      { image: "/hall1.png", title: "Minimal Luxury Lounge" },
      { image: "/hall2.png", title: "Elegant Family Room" },
      { image: "/hall3.png", title: "TV Unit Showcase" },
    ],
  },
  {
    title: "Bedrooms",
    reverse: false,
    projects: [
      { image: "/bedroom4.png", title: "Floor To Ceiling Wardrobe" },
      { image: "/bedroom1.png", title: "Bay Window Bedroom" },
      { image: "/bedroom2.png", title: "Luxury Master Suite" },
      { image: "/beedroom3.png", title: "Modern Bedroom Design" },
    ],
  },
  {
    title: "Wardrobes & Storage",
    reverse: true,
    projects: [
      { image: "/sts.png", title: "Sliding Wardrobe" },
      { image: "/sts1.png", title: "Walk In Closet" },
      { image: "/sts2.png", title: "Storage Wall System" },
      { image: "/sts3.png", title: "Luxury Wardrobe Unit" },
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

  const [showForm, setShowForm] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  const carouselRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {

      if (!carouselRef.current || popupShown) return;

      const rect = carouselRef.current.getBoundingClientRect();

      // Trigger when top of carousel reaches 200px from top
      if (rect.top < 200) {

        setPopupShown(true);

        setTimeout(() => {
          setShowForm(true);
        }, 1000);

      }

    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [popupShown]);

  return (
    <>
      <section
        ref={carouselRef}
        className="carousel-section"
      >

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

          <button
            className="carousel-btn"
            onClick={() => setShowForm(true)}
          >
            Call Our Experts
          </button>

        </div>

      </section>

      {showForm && (

        <div
          className="popup-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="popup-close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <ConsultationCard
              closeForm={() => setShowForm(false)}
            />

          </div>

        </div>

      )}

    </>
  );
}

export default Carousel;