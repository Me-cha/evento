import "./App.css";
import Header from "./components/header/header";
import Schedule from "./components/schedule/schedule";
import View_sch from "./components/view_schedule/View_sch";
import Image from "./components/image/image";
import Event_dis from "./components/Event _Dis/event_dis";
import ProfileScreen from "./components/my_profile/my_profile";
import AboutUsScreen from "./components/about_us/about_us";
import Signup from "./components/auth/Signup/Signup";
import Users from "./components/auth/Users/Users";
import Home from "./components/auth/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Calendar  from "./components/Calendar/Calendar";
import LandingPage from "./components/landing_page/LandingPage";
import View_event from "./components/view_event/View_event";
import EventInput from "./components/event/event";

function App() {
  console.log("trial log");
  return (
    <div className="App">
      {/* <div className="Authorization">
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div> */}
      {/* <Calendar/> */}
      {/* <LandingPage/> */}
      {/* <AboutUsScreen/> */}
     {/* <EventInput />*/}
      {/* <Event_dis/> */}
      {/* <Image /> */}
     {/*  <ProfileScreen/> */}
       {/* <Schedule />  */}
       {/* <EventInput /> */}
      {/* <EventInput /> */}
      {/* <Event_dis/> */}
      {/* <View_event/> */}
      {/* <Image /> */}
       {/* <ProfileScreen/> */}
      {/*  <Schedule />*/}
     <View_sch/> 
    </div>
  );
}

export default App;
