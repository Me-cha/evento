import React from "react";
import BannerBackground from "../LP_Assets/home-banner-background.png";
import BannerImage from "../LP_Assets/home-banner-image.png";
import Navbar from "./Navbar";
//import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            <h3>Managing Events are Hard !!</h3>  
          </h1>
          <h2 className="primary-heading1">
          <h2>We Can Help You</h2>
          </h2>
          
          
          <button className="secondary-button">
            Get Started 
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
