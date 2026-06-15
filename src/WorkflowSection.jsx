import { useState } from "react";
import "./App.css";

function WorkflowSection() {
  const services = [
    {
      title: "Consultation",
      description: "Understanding your vision and requirements.",
      image: "/consultation.png",
    },
    {
      title: "Planning",
      description: "Space planning and design strategy.",
      image: "/planning.jpg",
    },
    {
      title: "Visualization",
      description: "3D renders and design presentations.",
      image: "/visualization.jpg",
    },
    {
      title: "Execution",
      description: "Seamless implementation with precision.",
      image: "/execution.jpg",
    },
    {
      title: "Handover",
      description: "Delivering your dream space on time.",
      image: "/handover.jpg",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="workflow-section">

      <div className="workflow-bg"></div>

      <div className="container">

        <div className="section-header">

          <span className="section-tag">
            OUR PROCESS
          </span>

          <h2 className="section-title">
            From Concept
            <br />
            To Completion
          </h2>

        </div>

        <div className="workflow-layout">

          <div className="workflow-tabs">

            {services.map((service, index) => (
              <div
                key={index}
                className={`workflow-tab ${
                  activeTab === index ? "active" : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}

          </div>

          <div className="workflow-canvas">

            <div className="workflow-glow"></div>

            <div className="workflow-showcase">

              <img
                key={activeTab}
                src={services[activeTab].image}
                alt={services[activeTab].title}
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WorkflowSection;