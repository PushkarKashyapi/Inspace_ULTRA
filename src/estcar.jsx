import { useState } from "react";
import "./App.css";

const plans = [
  {
    name: "Essential Interiors",
    subtitle: "For homes to be rented out",
    price: "₹2.7 Lakh",
    popular: false,

    images: [
      "/hall2.png",
      "/sts.png",
      "/hall.png",
    ],

    breakdown: [
      {
        icon: "/bed53.png",
        title: "Kitchen",
        price: "₹1.6 Lakh",
      },
      {
        icon: "/bed30.png",
        title: "Wardrobes",
        price: "₹0",
      },
      {
        icon: "/bed36.png",
        title: "Other",
        price: "₹1.1 Lakh",
      },
    ],
  },

  {
    name: "Comfort Interiors",
    subtitle: "For first time homeowners",
    price: "₹4.0 Lakh",
    popular: true,

    images: [
      "/hall2.png",
      "/sts.png",
      "/hall.png",
    ],

    breakdown: [
      {
        icon: "/bed53.png",
        title: "Kitchen",
        price: "₹2.3 Lakh",
      },
      {
        icon: "/bed30.png",
        title: "Wardrobes",
        price: "₹0",
      },
      {
        icon: "/bed36.png",
        title: "Other",
        price: "₹1.7 Lakh",
      },
    ],
  },

  {
    name: "Luxury Interiors",
    subtitle: "Best of design and style",
    price: "₹4.7 Lakh",
    popular: false,

    images: [
      "/hall2.png",
      "/sts.png",
      "/hall.png",
    ],

    breakdown: [
      {
        icon: "/bed53.png",
        title: "Kitchen",
        price: "₹2.8 Lakh",
      },
      {
        icon: "/bed30.png",
        title: "Wardrobes",
        price: "₹0",
      },
      {
        icon: "/bed36.png",
        title: "Other",
        price: "₹1.9 Lakh",
      },
    ],
  },
];

function EstimateCard({ plan }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) =>
      prev === plan.images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? plan.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="estimate-plan">

      <div className="estimate-head">

        <div>

          <div className="plan-title">

            <h3>{plan.name}</h3>

            {plan.popular && (
              <span className="popular-tag">
                POPULAR
              </span>
            )}

          </div>

          <p>{plan.subtitle}</p>

        </div>

        <div className="price-area">

          <h2>{plan.price}</h2>

          <a href="/">View details</a>

        </div>

      </div>

      <div className="image-slider">

        <button
          className="slide-btn left"
          onClick={prev}
        >
          ❮
        </button>

        <img
          src={plan.images[current]}
          alt={plan.name}
        />

        <button
          className="slide-btn right"
          onClick={next}
        >
          ❯
        </button>

      </div>

      <div className="estimate-footer">

        {plan.breakdown.map((item, index) => (

          <>

            <div
              className="estimate-feature"
              key={item.title}
            >

              <img
                src={item.icon}
                alt=""
              />

              <div>

                <span>{item.title}</span>

                <strong>{item.price}</strong>

              </div>

            </div>

            {index !==
              plan.breakdown.length - 1 && (
              <div className="plus">
                +
              </div>
            )}

          </>

        ))}

      </div>

    </div>
  );
}

function EstCard() {
  return (
    <section className="estimate-cards">

      <div className="modify-row">

        <button className="modify-btn">
          Modify Requirements ▶
        </button>

      </div>

      <div className="cards-grid">

        {plans.map((plan) => (
          <EstimateCard
            key={plan.name}
            plan={plan}
          />
        ))}

      </div>

      <p className="estimate-note">

        <strong>Note:</strong> This is an approximate
        estimate based on your selections and may
        vary depending on dimensions, material,
        customization and final scope of work.

      </p>

    </section>
  );
}

export default EstCard;