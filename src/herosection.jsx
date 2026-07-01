import { useState } from "react";
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
import ConsultationCard from "./leadcard";

function HeroSection() {
  const [showForm, setShowForm] = useState(false);

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
          <source src="/final.mp4" type="video/mp4" />
        </video>

        <div className="overlay"></div>

        <nav className="navbar">
          <div className="logo">
            Inspace<span>Craft</span>
          </div>

          <ul className="nav-links"></ul>

          <button
            className="nav-btn"
            onClick={() => setShowForm(true)}
          >
            Free Consultation
          </button>
        </nav>

        <div className="hero-text">
          <h1>
            Designing Spaces
            <br />
            That Feel Like Home
          </h1>

          <p>Elegant interiors crafted for modern living.</p>

         <button
  className="primary-btn"
  onClick={() => setShowForm(true)}
>
  Explore Projects
</button>
        </div>
      </section>

      <Why openConsultation={() => setShowForm(true)} />

      <Carousel />
      <WorkflowSection />
      <FormSection />
      <Test />
      <NewFormSection />
      <Visit />
      <Interior />
      <Client />
      <Feet />

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

export default HeroSection;