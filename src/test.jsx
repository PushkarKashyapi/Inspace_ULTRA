import { useState } from "react";
import "./App.css";

const testimonials = [
  {
    quote:
      "After talking to so many contractors in Ranchi, trust hi nahi bacha tha. These guys were transparent from Day 1, no hidden costs, and delivered exactly what they promised. Huge relief",
    author: "Shreya Singh – Morabadi",
    image: "aurat1.avif",
  },
  {
    quote:
      "Our biggest fear was project delays because everyone around us had bad experiences. Surprisingly, everything was completed on schedule, and the finishing quality is outstanding. Bilkul tension-free experience.",
    author: "Anjali Agarwal – Bariatu",
    image: "aurat2.avif",
  },
  {
    quote:
      "Monsoon mein moisture ki wajah se furniture kharab hone ka concern tha. The team recommended better materials instead of just selling expensive options. Bahut practical advice mila, and the result looks premium too.",
    author: "Vivek Sinha – Lalpur",
    image: "mard1.webp",
  },
  {
    quote:
      "Storage was a big challenge in our apartment. They designed every corner smartly without making the house feel crowded. Budget bhi maintain raha, aur final look expected se bhi better nikla. Sach mein paisa vasool!",
    author: "Ashok Verma – Ashok Nagar",
    image: "mard2.avif",
  },
  {
    quote:
      "We had almost finalized another contractor, but every meeting brought new costs. Here, everything was explained upfront, and there were no last-minute surprises. The team even accommodated a few changes without any hassle. Ab ghar dekh ke lagta hai sahi decision liya.",
    author: "Saurabh Prasad – Kanke Road, Ranchi",
    image: "mard.avif",
  },
];

export default function Test() {
  const [items, setItems] = useState(testimonials);

  const moveLeft = () => {
    const arr = [...items];
    const last = arr.pop();
    arr.unshift(last);
    setItems(arr);
  };

  const moveRight = () => {
    const arr = [...items];
    const first = arr.shift();
    arr.push(first);
    setItems(arr);
  };

  return (
    <section className="testimonials">

      <div className="testimonials-header">
        <span>TESTIMONIALS</span>
        <h2>What Our Clients Say</h2>
      </div>

      <div className="cards-wrapper">

        {items.map((item, index) => {
          const center = 2;
          const pos = index - center;

          return (
            <div
              key={index}
              className={`testimonial-card ${
                pos === 0 ? "active" : ""
              }`}
              style={{
                transform: `
                  translateX(${pos * 310}px)
                  translateY(${pos === 0 ? -60 : 0}px)
                  rotate(${pos * 4}deg)
                `,
                zIndex: 100 - Math.abs(pos),
              }}
            >
              <img src={item.image} alt="" />

              <h3>
                "{item.quote}"
              </h3>

              <p>
                - {item.author}
              </p>
            </div>
          );
        })}
      </div>

      <div className="testimonial-nav">

        <button onClick={moveLeft}>
          &#8249;
        </button>

        <button onClick={moveRight}>
          &#8250;
        </button>

      </div>

    </section>
  );
}