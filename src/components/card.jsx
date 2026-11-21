import React from "react";
import Image5 from "../assets/image copy 4.png";

export default function Card() {
  return (
    <div className="card">
      <div className="card--image">
        <img src={Image5} alt="Image 5" />
      </div>
      <h2>Luxury Villa</h2>
      <p>Oceanfront</p>
      <div className="price">$1,000,000</div>
      <div className="view-details-container">
        <button className="view-details">View Details</button>
      </div>
    </div>
  );
}