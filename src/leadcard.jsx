import { useState } from "react";
import axios from "axios";
import "./App.css";
import Swal from "sweetalert2";

function ConsultationCard() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    city: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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

      if (window.fbq) {
  window.fbq("track", "Lead");
}

     Swal.fire({
  icon: "success",
  title: "Consultation Booked!",
  text: "Thank you for contacting InspaceCraft. Our design expert will reach out to you shortly.",
  confirmButtonText: "Great!",
  confirmButtonColor: "#EC1C24",
  background: "#ffffff",
  color: "#222",
  width: 500,
  showClass: {
    popup: "animate__animated animate__zoomIn",
  },
  hideClass: {
    popup: "animate__animated animate__zoomOut",
  },
});

      setFormData({
        name: "",
        contact: "",
        city: "",
      });

      // Hide the card after successful submission
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
     Swal.fire({
  icon: "error",
  title: "Oops!",
  text: "Something went wrong. Please try again.",
  confirmButtonColor: "#EC1C24",
});
    }
  };

  // Don't render anything after successful submission
  if (isSubmitted) {
    return null;
  }

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

export default ConsultationCard;