import React from "react";
import AboutBackground from "../LP_Assets/about-background.png";
import AboutBackgroundImage from "../LP_Assets/about-background-image.png";
// import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About Us</p>
        <h1 className="primary-heading">Plan-Execute-Enjoy</h1>
        <p className="primary-text">
          Welcome to our event management website ! The portal is dedicated in planning and organizing events. With
          our expertise and attention to detail, we ensure that every event is a
          resounding success. Our primary goal is to take the stress out of
          event planning for our clients. Whether you're organizing a corporate
          conference, a wedding, a charity fundraiser, or any other type of
          event, we are here to provide you with a seamless and unforgettable
          experience.
        </p>
        {/* <p className="primary-text">
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p> */}
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;
