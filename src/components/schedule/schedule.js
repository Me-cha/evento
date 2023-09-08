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
import Header from "../header/header";
import { Height, SpaRounded } from "@mui/icons-material";
import Calendar from "../Calendar/Calendar";
import { borderRadius } from "@mui/system";

function Schedule() {
  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [schedulde_start, setscheduldeStart] = useState("");
  const [schedulde_end, setscheduldeEnd] = useState("");
  const [scheduletitle, setscheduletitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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
      <div className="header_schedule" style={{}}>
        <Header />
      </div>
      <div className="sch_box">
        <p style={{ margin: "25px" }}>DevFest2022</p>
      </div>
      <div
        className="schBody"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="calendar_sch" style={{}}>
          <Calendar />
        </div>
        <div
          className="schBody-right"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10vw 10vh",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="SCHEDULE 1"
              style={{
                fontSize:"30px",
                marginTop:"220px",
                marginBottom:"30px",
                width:"200px",
              }}
              onChange={(e) => setscheduletitle(e.target.value)}
            />
          </div>
          

          

          <div className="place">
            <label style={{fontsize:"25px"}}>Name: </label>
            <input
              type="text"
              style={{ 
                width:"500px",
                fontSize:"25px",
                // marginBottom:"180px",
                }}
              placeholder="Name of Event"
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>



          <div>
              <label>Start Date</label>
            </div>
            <input
              placeholder=" Start Date"
              type="date"
              style={{
                marginBottom:"300px",
                width:"200px",
                fontSize:"20px",
                
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />




            <div>
              <label>Start Time</label>
            </div>
            <input
              placeholder=" Start Time"
              type="time"
              style={{
                width:"200px",
                marginBottom:"-300px"
              }}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
              
              <div>
              <label>End Date</label>
            </div>
            <input
              placeholder=" End Date"
              type="date"
              style={{
                marginBottom:"-100px",

                width:"200px",
                fontSize:"20px",
                
              }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
             

              <div>
              <label>EndTime</label>
            </div>
            <input
              placeholder=" End Time"
              type="time"
              style={{
                width:"200px",
                marginBottom:"600px",
                
              }}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
          
            />
            </div>

            <div
          className="tb"
          style={{ display: "flex", justifyContent: "center" , marginTop:"-1%"}}
        >
          <textarea
            placeholder=" Location..."
            rows={"10"}
            cols={"60"}
            style={{
              borderRadius: "10px",
              box_sizing: "border-box",
              width: "45vw",
              height: "15vh",
              background: "#FFFFFF",
              border: "1px solid #000000",
              border_radius: "15px",
              marginTop:"1000px",
              marginLeft:"-900px"
              
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
              borderRadius: "10px",
              box_sizing: "border-box",
              width: "45vw",
              height: "15vh",
              background: "#FFFFFF",
              border: "1px solid #000000",
              border_radius: "15px",
              marginTop:"800px",
              marginLeft:"-900px"
              
            }}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div> 
        </div>
      </div>
     

  );
}
export default Schedule;
