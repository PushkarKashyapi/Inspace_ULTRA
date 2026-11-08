import { useState } from "react";
import axios from "axios";
import "./App.css";

function ConsultationCarder({ onSuccess }) {
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
      const res = await axios.post(
        "https://inspace-backender.onrender.com/lead",
        formData
      );

      setFormData({
        name: "",
        contact: "",
        city: "",
      });

      alert(res.data.message);

      // Close the modal and remove the blur
      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
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
  );
}

export default ConsultationCarder;