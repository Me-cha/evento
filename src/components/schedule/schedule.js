import "./schedule.css";
import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import Header from '../header/header';
import { SpaRounded } from "@mui/icons-material";
import Calendar from "../Calendar/Calendar";


function Schedule() {
  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [schedulde_start, setscheduldeStart] = useState("");
  const [schedulde_end, setscheduldeEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [scheduletitle, setscheduletitle] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setnotification] = useState(false);
  const [description, setdescription] = useState("");

  const eventRef = doc(db, "event", "8OkkhqzX1clf3U0FoZJ5");
  const scheduleRef = collection(eventRef, "schedule");

  useEffect(() => {
    if (imageUrls.length > 0) {
      addscheduleToDatabase();
    }
  }, [imageUrls]);

  const addscheduleToDatabase = async () => {
    try {
      const scheduldeStart = new Date(schedulde_start);
      const scheduldeEnd = new Date(schedulde_end);
      await addDoc(scheduleRef, {
        Organizor_image: imageUrls[0],
        schedulde_start: scheduldeStart,
        schedulde_end: scheduldeEnd,
        schedule_title: scheduletitle,
        schedule_Notification: notification,
        schedule_venue: Venue,
        schedule_description: description,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    if (file == null) return;
    const imageRef = ref(storage, `schedule/${file.name}.${v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]);
      });
    });
  };

  const onSubmit = () => {
    handleUpload();
  };

  return (
    <div>
      <div className="header_schedule"
      style={{
      
      }}>
        
        <Header />
      </div>
      <div className="sch_box">
        <p style={{ margin: "25px" }}>DevFest2022</p>
      </div>
      <div className="calendar_sch" style={{ }}>
      <Calendar/>
      </div>
      <div
        className="schedule"
        style={{ }}
      >
        <div
          className="schBody"
          style={{
           
          }}
        >
          <div
            className="schBody-left"
            style={{
              
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <input
                placeholder="SCHEDULE 1"
                style={{
                  
                }}
                onChange={(e) => setscheduletitle(e.target.value)}
              />
            </div>
           
          </div>
          <div
            className="schBody-right"
            style={{
             
            }}
          >
            <div>
           
              <label>Start Date</label>
            
            <input
              placeholder=" Start Date"
              type="date"
              style={{
                marginleft:"60%"
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

           
              <label>Start Time</label>
            
            <input
              placeholder=" Start Time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

            
              <label>End Date</label>
            
            <input
              placeholder=" End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            
              <label>End Time</label>
            
            <input
              placeholder="End Time"
              type="time"
              style={{
                        marginleft:"40%",
              }}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        
            
            <div className="place">
              <label>Name </label>
              <input
                type="text"
                style={{ 
                          
                 }}
                placeholder="..."
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            
          </div>
        </div>

        <div
          className="tb"
          style={{ display: "flex", justifyContent: "center" , marginTop:"-1%"}}
        >
          <textarea
            placeholder=" Location"
            rows={"10"}
            cols={"60"}
            style={{ 
                      marginLeft:"40%",
                      marginTop:"-28.5%",
                      borderRadius:"10px",
                      width:"48vw",
                      height:"10vh",
                      padding:"10px"
                      
              
            }}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div
          className="tb"
          style={{ display: "flex", justifyContent: "center" , marginTop:"-1%"}}
        >
          <textarea
            placeholder=" Schedule Brief..."
            rows={"10"}
            cols={"60"}
            style={{ 
                      marginLeft:"40%",
                      marginTop:"-22%",
                      borderRadius:"10px",
                      width:"48vw",
                      height:"15vh",
                      border_radius:"15px",
                      resize:"none",
                      padding:"10px",
                      
              
            }}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
export default Schedule;
