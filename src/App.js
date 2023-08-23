/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./components/header/header";
import OrgEvents from "./components/event/event";
import Schedule from "./components/schedule/schedule";
import Sharebutton from "./components/share/share";
import Image from "./components/image/image";
import AttendEvents from "./components/Event _Dis/event_dis";
import Profile from "./components/my_profile/my_profile";
import AboutUsScreen from "./components/about_us/about_us";
import Signup from "./components/auth/Signup/Signup";
import Users from "./components/auth/Users/Users";
//import Home from "./components/auth/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Calendar  from "./components/Calendar/Calendar";
import LandingPage from "./components/landing_page/LandingPage";

function App() {
  console.log("trial log");
  return (
    <div className="App">
      <div className="Authorization">
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<LandingPage/>}/>;
            <Route path="/signup" element={<Signup />} />
            <Route path="/users" element={<Users />} />
            <Route path="/calendar" element={<Calendar/>}/>;
            <Route path="/orgevents" element={<OrgEvents/>}/>;
            <Route path="/attendevents" element={<AttendEvents/>}/>;
            <Route path="/schedule" element={<Schedule/>}/>
            <Route path="/myprofile" element={<Profile/>}/>
          </Routes>
        </Router>
      </div>
      {/* <Calendar/> */}
      {/* <LandingPage/> */}
      {/* <AboutUsScreen/> */}
      {/* <Sharebutton /> */}
     {/* <EventInput />*/}
      {/* <Event_dis/> */}
      {/* <Image /> */}
     {/*  <ProfileScreen/> */} 
      {/* <EventInput /> */}
      {/* <Event_dis/> */}
      {/* <Image /> */}
      {/* <Schedule /> */}
    </div>
  );
}

export default App;
