import { useState } from "react";
import "./App.css";

const testimonials = [
  {
    quote:
      "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
    author: "Pete, Sales Director at RevenueRockets",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    quote:
      "I switched 5 years ago and never looked back.",
    author: "Andy, DevOps Engineer at CloudMasters",
    image: "https://i.pravatar.cc/150?img=10",
  },
  {
    quote:
      "COMPANY's customer support is unparalleled. They're always there when we need them.",
    author: "Olivia, Customer Success Manager at ClientCare",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    quote:
      "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    author: "Marina, HR Manager at TalentForge",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote:
      "It's just the best. Period.",
    author: "Fernando, UX Designer at UserFirst",
    image: "https://i.pravatar.cc/150?img=9",
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