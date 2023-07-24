import React from "react";
import Schedule from "../LP_Assets/pick-meals-image.png";
import Notify from "../LP_Assets/choose-image.png";
import Manage from "../LP_Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: Schedule,
      title: "Schedule",
      text: "Plan and schedule all your meetings at one place.",
    },
    {
      image: Notify,
      title: "Notify",
      text: "Make your attendees aware of your event, meeting, conference and notify them for it. ",
    },
    {
      image: Manage,
      title: "Manage",
      text: "Manage the flow of events, manage the attendees for better user experience.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        <h2>Plan your Meetings, Events, Conferences and execute smoothly</h2>
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
