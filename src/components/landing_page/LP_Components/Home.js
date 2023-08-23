import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2Fhome-banner-background.png?alt=media&token=f1b4b6a9-8887-4325-ae69-fad0a64978f6" alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            <h3>Managing Events are Hard !!</h3>  
          </h1>
          <h2 className="primary-heading1">
          <h2>We Can Help You</h2>
          </h2>
          
          
          <button onClick={()=>{navigate("/users")}} className="secondary-button">
            Get Started 
          </button>
        </div>
        <div className="home-image-section">
          <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2Fhome-banner-image.png?alt=media&token=c7c4edfd-6117-491a-9bd8-b2602fb86433" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
