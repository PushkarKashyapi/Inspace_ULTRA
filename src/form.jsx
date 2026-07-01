import "./App.css";
import { useState } from "react";
import axios from "axios";

function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://inspace-backender.onrender.com/lead", formData);

      alert(res.data.message);

      setFormData({
        name: "",
        contact: "",
        city: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="form-section">
      <div className="form-overlay"></div>

      <div className="form-container">
        <div className="form-content">
          <span className="form-tag">
            FREE CONSULTATION
          </span>

          <h2>
            600+ Expert Designers,
            <br />
            Ready To Design
            <br />
            Your Dream Space.
          </h2>

          <p>
            Get personalized interior design guidance,
            budget planning, and project consultation
            from our experienced team.
          </p>
        </div>

        <div className="consultation-card">
          <div className="icon-circle"></div>

          <h3>Book A Free Consultation</h3>

          <p>
            Schedule a meeting with our interior experts
            and start your transformation journey.
          </p>

          <form
            className="consultation-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="contact"
              placeholder="Phone Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="Your City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Schedule Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FormSection;