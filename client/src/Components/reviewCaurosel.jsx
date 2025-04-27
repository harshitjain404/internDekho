import React from "react";
import "./reviewCarousel.css";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Yogesh Singh",
    review:
      "I got my first internship from here. Internshala is a must for career-oriented students. This app has a lot of opportunities for every kind of student.",
    rating: 5,
    image: "/users/user1.jpg",
  },
  {
    name: "Yaswanth Mandapati",
    review:
      "I applied to Amazon and got the job! It was my dream. I learnt SQL, Python, Tableau and worked on many projects which helped a lot during interviews.",
    rating: 5,
    image: "/users/user2.jpg",
  },
];

const ReviewsCarousel = () => {
  return (
    <div className="reviews-carousel-container">
      <div className="left-section">
        <FaQuoteLeft className="quote-icon" />
        <h2>Join the pool of 21k+ students and get started with your career</h2>
        <div className="rating-section">
          <div className="rating-number">
            4.2 <FaStar className="star" />
          </div>
          <p>(390 Reviews)</p>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.internshala.app"
          target="_blank"
          rel="noreferrer"
          className="playstore-button"
        >
          Get it on Google Play →
        </a>
      </div>

      <div className="right-section">
        {reviews.map((item, index) => (
          <div className="review-card" key={index}>
            <h3>{item.review}</h3>
            <div className="user-info">
              {/* <img src={item.image} alt={item.name} /> */}
              <div>
                <p>{item.name}</p>
                <div className="stars">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Add arrows if you want carousel movement */}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
