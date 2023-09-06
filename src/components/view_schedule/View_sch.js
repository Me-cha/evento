import "./View_sch.css";
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
import Calendar from "../Calendar/Calendar";

function View_sch() {
  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [scheduletitle, setscheduletitle] = useState("");
  const [Venue, setVenue] = useState("");
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
      await addDoc(scheduleRef, {
        Organizor_image: imageUrls[0],
        schedule_title: scheduletitle,
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
      <div className="sch_box" style={{ margin: "25px", marginTop: "100px" }}>
        <p style={{ margin: "25px" }}>DevFest 2022 Nagpur</p>
      </div>

      <div className="calendar_sch" style={{}}>
        <Calendar />
      </div>

      <div className="schedule" style={{}}>
        <div className="schBody" style={{}}>
          <div className="schBody-left" style={{}}>
            <div style={{}}>
              <input
                placeholder="SCHEDULE 1(name)"
                style={{ marginLeft: "800px", marginBottom: "10px" }}
                onChange={(e) => setscheduletitle(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px", marginLeft: "800px" }}>
              <input
                placeholder="SCHEDULE 2(name)"
                style={{}}
                onChange={(e) => setscheduletitle(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px", marginLeft: "800px" }}>
              <input
                placeholder="SCHEDULE 3(name)"
                style={{}}
                onChange={(e) => setscheduletitle(e.target.value)}
              />
            </div>
          </div>
          <div className="schBody-right" style={{}}>
            <div>
              <label>Date</label>

              <input
                placeholder="date"
                type="text"
                name="date"
                style={{}}
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Date</label>

              <input
                placeholder="date"
                type="text"
                name="date"
                style={{
                  marginleft: "60%",
                }}
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Date</label>

              <input
                placeholder="date"
                type="text"
                name="date"
                style={{
                  marginleft: "60%",
                }}
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Time</label>

              <input
                placeholder="time"
                type="text"
                name="time"
                value={Time}
                onChange={(e) => setTime(e.target.value)}
              />

              <label>Time</label>

              <input
                placeholder="time"
                type="text"
                name="time"
                value={Time}
                onChange={(e) => setTime(e.target.value)}
              />

              <label>Time</label>

              <input
                placeholder="time"
                type="text"
                name="time"
                value={Time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div
          className="tb"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-1%",
          }}
        >
          <input
            placeholder=" Location"
            type="text"
            value={Venue}
            rows={"10"}
            cols={"60"}
            style={{
              marginLeft: "40%",
              marginTop: "-28.5%",
              width: "15vw",
              height: "3vh",
              padding: "10px",
            }}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div
          className="tb"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-1%",
          }}
        >
          <input
            placeholder=" About"
            rows={"10"}
            cols={"60"}
            style={{
              marginLeft: "40%",
              marginTop: "-22%",
              width: "20vw",
              height: "5vh",
              border_radius: "15px",
              resize: "none",
              padding: "10px",
            }}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="Viewbutton">
          <button
            style={{
              marginTop: "180px",
              margin: "4px auto",
              alignItems: "50%",
              width: "5vw",
              height: "4vh",
              display: "block",
              backgroundColor: "#7B43AC",
              fontFamily: "Roboto",
              fontSize: "17px",
              borderRadius: "7px",
              color: "#FFFFFF",
            }}
          >
            View
          </button>

          <div className="Viewbutton">
            <button
              style={{
                marginTop: "180px",
                margin: "4px auto",
                alignItems: "50%",
                width: "5vw",
                height: "4vh",
                display: "block",
                backgroundColor: "#7B43AC",
                fontFamily: "Roboto",
                fontSize: "17px",
                borderRadius: "7px",
                color: "#FFFFFF",
              }}
            >
              View
            </button>

            <div className="Viewbutton">
              <button
                style={{
                  marginTop: "180px",
                  margin: "4px auto",
                  alignItems: "50%",
                  width: "5vw",
                  height: "4vh",
                  display: "block",
                  backgroundColor: "#7B43AC",
                  fontFamily: "Roboto",
                  fontSize: "17px",
                  borderRadius: "7px",
                  color: "#FFFFFF",
                }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default View_sch;
