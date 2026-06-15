import "./App.css";

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
];

function CarouselRow({ reverse }) {
  return (
    <div className={`carousel-track ${reverse ? "reverse" : ""}`}>
      {[...images, ...images].map((img, index) => (
        <div className="carousel-card" key={index}>
          <img src={img} alt="Interior Design" />
        </div>
      ))}
    </div>
  );
}

function Carousel() {
  return (
    <section className="carousel-section">

      <div className="carousel-header">
        <h2>End-to-End Offerings</h2>
        <a href="/">See All</a>
      </div>

      <CarouselRow />
      <CarouselRow reverse />
      <CarouselRow />

    </section>
  );
}

export default Carousel;