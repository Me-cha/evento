import "./schedule.css";
import React, { useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import Header from "../header/header";
import Calendar from "../Calendar/Calendar";

function Schedule() {
  const [scheduletitle, setscheduletitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setNotification] = useState(false);
  const [description, setDescription] = useState("");

  const eventRef = doc(db, "event", "d");
  const scheduleRef = collection(eventRef, "schedule");

  const addscheduleToDatabase = async () => {
    try {
      await setDoc(doc(scheduleRef,scheduletitle), {
        schedule_title: scheduletitle,
        schedule_startDate: startDate,
        schedule_endDate: endDate,
        schedule_Venue: Venue,
        schedule_notification: notification,
        schedule_description: description,
      });
      
      // setscheduletitle("");
      // setStartDate("");
      // setEndDate("");
      // setVenue("");
      // setNotification(false);
      // setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="header_schedule" style={{}}>
        <Header />
      </div>
      <div className="sch_box" style={{ margin: "12vh 1vw 0vh" }}>
        <p style={{ margin: "3vh auto " }}>DevFest2022</p>
      </div>
      <div
        className="schBody"
        style={{
          display: "flex",
          flexDirection: "row",
          borderTop: "2px solid black",
          borderBottom: "2px solid black",
          margin: "21vh 0vw 1vh",
        }}
      >
        <div
          className="calendar_sch"
          style={{
            marginTop: "-20vh",
            height: "50vh",
            width: "50%",
          }}
        >
          <Calendar />
        </div>

        <div
          className="schBody-right"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0vh 3vw",
            height: "70vh",
            width: "50vw",
            borderLeft: "2px solid black",
          }}
        >
          <label style={{ margin: "5vh 0vw 0vh 0vw", fontSize: "17pt" }}>
            SCHEDULE 1
          </label>

          <div className="place">
            <label style={{ fontSize: "25px" }}>Name</label>
            <br />
            <input
              type="text"
              style={{
                width: "30vw",
                height: "3vh",
              }}
              value={scheduletitle}
              onChange={(e) => setscheduletitle(e.target.value)}
            />
          </div>

          <div
            className="SchDates"
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "2vh 0vw 1vh",
            }}
          >
            <div>
              <label>Schedule Start</label>
              <br />
              <input
                type="datetime-local"
                value={startDate}
                style={{ margin: "0vh 1vw 2vh" }}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label>Schedule End</label>
              <br />
              <input
                type="datetime-local"
                value={endDate}
                style={{ margin: "0vh 1vw" }}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <label>Location</label>
          <div
            className="tb"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <textarea
              placeholder="Location..."
              rows={"10"}
              cols={"60"}
              style={{
                borderRadius: "10px",
                box_sizing: "border-box",
                width: "40vw",
                height: "10vh",
                background: "#FFFFFF",
                border: "1px solid #000000",
                borderRadius: "15px",
                margin: "0vh 0vw 2vh",
                resize: "none",
              }}
              value={Venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <label>About</label>
          <div
            className="tb"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <textarea
              placeholder="Schedule Brief..."
              rows={"10"}
              cols={"60"}
              style={{
                borderRadius: "10px",
                boxSizing: "border-box",
                width: "40vw",
                height: "15vh",
                background: "#FFFFFF",
                border: "1px solid #000000",
                borderRadius: "15px",
                resize: "none",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={addscheduleToDatabase}
        style={{
          margin: "0vh auto",
          width: "150px",
          height: "50px",
          display: "block",
          backgroundColor: "#7B43AC",
          fontFamily: "Roboto",
          fontSize: "23px",
          fontWeight: "500",
          borderRadius: "10px",
          color: "#FFFFFF",
        }}
      >
        ADD
      </button>
    </div>
  );
}

export default Schedule;
