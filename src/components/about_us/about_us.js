import React from 'react';
import "./about_us.css"
import Header from '../header/header';

const AboutUsScreen = () => {

  return (
    <div className='about_screen' style={{ alignItems:"center" ,width:"100vw",height:"100vh"}}>
      <div className="header">
        <Header/>
      </div>
      <div style={{ display:"flex",flexDirection:"row",alignItems:"center", margin:"20vh 0vh 0vh 10vh" }}>
        <div className="aboutus">
          <h1 style={{ marginTop: "0px", color: "#F00000" }}> About Us </h1>

          {<div className="content" style={{ fontSize:"15px"}}>
            <p>At EVENTO, we are passionate about bringing people together and creating memorable events.
              We understand the importance of seamless event organization and scheduling. Our mission is to empower event organizers with a comprehensive platform that streamlines event management tasks, saves time, and enhances the overall experience for both organizers and attendees.</p>
            <p>With EVENTO, you gain access to a comprehensive suite of features and tools  designed to streamline the event planning process. Our intuitive interface enables you to effortlessly create event schedules, manage attendee.
              We prioritize multiple event sharing to multiple users, flexibility and customization, ensuring that our platform adapts to your specific event requirements.</p>
            <p>Choosing EVENTO means partnering with a reliable and innovative event management solution. Join the growing community of event organizers who trust EVENTO to create unforgettable experiences. Start planning your next event with ease.</p>
            <p>Let's create remarkable events together!</p>
          </div>}
        </div>
        <div className="about-image">
            <img style={{ height:"70vh",width:"30vw", marginRight:"100px" }} src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/application%2FAbout%20Us%20Image.jpg?alt=media&token=d921c5a6-3914-4d1e-ab49-a80b3201bbf1" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUsScreen;
