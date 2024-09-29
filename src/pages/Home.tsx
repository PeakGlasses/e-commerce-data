import React from "react";
import "../styles/pages/HomePage.css";

export function Home() {
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SkyShop</h1>
          <p>Your one-stop shop for premium sunglasses.</p>
          <button className="shop-now-button">Shop Now</button>
        </div>
      </section>
      <section className="featured-products">
        <h2>Featured Sunglasses</h2>
        <div className="products-grid">
          <div className="product-card">
            <img
              src="https://via.placeholder.com/200x150?text=Sunglasses+1"
              alt="Sunglasses 1"
            />
            <h3>Classic Aviators</h3>
            <p>$120</p>
          </div>
          <div className="product-card">
            <img
              src="https://via.placeholder.com/200x150?text=Sunglasses+2"
              alt="Sunglasses 2"
            />
            <h3>Retro Round Glasses</h3>
            <p>$90</p>
          </div>
          <div className="product-card">
            <img
              src="https://via.placeholder.com/200x150?text=Sunglasses+3"
              alt="Sunglasses 3"
            />
            <h3>Sporty Shades</h3>
            <p>$150</p>
          </div>
          <div className="product-card">
            <img
              src="https://via.placeholder.com/200x150?text=Sunglasses+4"
              alt="Sunglasses 4"
            />
            <h3>Polarized Lenses</h3>
            <p>$200</p>
          </div>
        </div>
      </section>
    </div>
  );
}
