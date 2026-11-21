import React from "react";

export default function Card2(props) {
  return (
    <div className="card">
      <div className="card--image"
       style={{ 
          backgroundImage: `url(${props.image})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center" ,
          borderRadius:"5px",
          height: "200px",
          width: "100%"
        }}>
      </div>
      <h2>{props.name}</h2>
      <p>{props.type}</p>
      <div className="price">Rs: {props.price.toLocaleString()}</div>
      <p>{props.description}</p>
      <div className="view-details-container">
        <button className="view-details">View Details</button>
      </div>
    </div>
  );
}