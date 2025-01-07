import React from "react";
import './product-card.css';
import meat from "../../assets/meat.jpg";

function Card({ productId, name, description, price, imageUrl }) {
  return (
    <div className="product-card">
      <img 
        src={imageUrl || meat} 
        alt={`${name}`} 
        // className="product-image" 
      />
      <div className="product-details">
        <h5 className="product-title">{name}</h5>
        <p className="product-description">{description}</p>
        <div className="product-price">${price}</div>
        {/* <button className="btn view-btn">View Product</button> */}
      </div>
    </div>
  );
}

export default Card;
