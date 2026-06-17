import "./App.css";
import Why from "./why";
import Carousel from "./carousel";
import WorkflowSection from "./WorkflowSection";
import FormSection from "./form";
import NewFormSection from "./newform";
import Test from "./test";
import Visit from "./visit";
import Client from "./client";
import Interior from "./interior";
import Feet from "./feet";
function HeroSection() {
  return (
    <>
      <section className="hero">

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/inspace.mp4" type="video/mp4" />
        </video>

        <div className="overlay"></div>

        <nav className="navbar">
          <div className="logo">
            Inspace<span>Craft</span>
          </div>

          <ul className="nav-links">
            <li>Home</li>
            <li>Projects</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <button className="nav-btn">
            Free Consultation
          </button>
        </nav>

        <div className="hero-text">
          <h1>
            Designing Spaces
            <br />
            That Feel Like Home
          </h1>

          <p>
            Elegant interiors crafted for modern living.
          </p>

          <button className="primary-btn">
            Explore Projects
          </button>
        </div>

      </section>

      <Why />

      <Carousel />

      <WorkflowSection />
      <FormSection />
      <Test />
       <NewFormSection />
      <Visit />
      <Interior />
      <Client />
      <Feet />

    </>
  );
}

export default HeroSection;