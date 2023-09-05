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
                placeholder="SCHEDULE TITLE"
                style={{
                  
                }}
                onChange={(e) => setscheduletitle(e.target.value)}
              />
            </div>
            <div className="sch_img_dis">
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="user-uploaded media"
                  style={{
                   
                  }}
                />
              )}
                <input
                  type="file"
                  className="sch_img"
                  style={{
                   
                  }}
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/, video/"
                />
            </div>
          </div>
          <div
            className="schBody-right"
            style={{
             
            }}
          >
            <div>
              <label>DATE-TIME</label>

              <div>
                <label style={{ fontSize: "13px" }}> START : </label>
                <input
                  type="datetime-local"
                  style={{ marginBottom: "10px" }}
                  onChange={(e) => setscheduldeStart(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px" }}> END : </label>
                <input
                  type="datetime-local"
                  style={{ marginBottom: "10px" }}
                  onChange={(e) => setscheduldeEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="place">
              <label>Venue:</label>
              <input
                type="text"
                style={{ marginBottom: "10px" }}
                placeholder="Enter venue here"
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div className="notification">
              <label>
                <input
                  type="checkbox"
                  style={{}}
                  onChange={(e) => setnotification(e.target.checked)}
                />
                NOTIFICATIONS
              </label>
            </div>
          </div>
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
              
            }}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div
          className="savebutton"
          style={{
           
          }}
        >
          <button
            onClick={onSubmit}
            style={{
             
            }}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
export default Schedule;
