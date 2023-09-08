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
import { Height, SpaRounded } from "@mui/icons-material";
import Calendar from "../Calendar/Calendar";
import { borderRadius } from "@mui/system";

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
            margin: "auto",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="SCHEDULE 1 (name)"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                marginTop: "110px",
                width: "250px",
              }}
              onChange={(e) => setscheduletitle(e.target.value)}
            />
          </div>

          <div>
            <label>Date</label>
          </div>
          <input
            placeholder=" Date"
            type="text"
            style={{
              marginBottom: "100px",
              width: "200px",
              fontSize: "15px",
            }}
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div>
            <label>Time</label>
          </div>
          <input
            placeholder=" Time"
            type="text"
            style={{
              width: "200px",
              marginBottom: "-150px",
            }}
            value={Time}
            onChange={(e) => setTime(e.target.value)}
          />

          <div>
            <label>Location</label>
          </div>
          <input
            placeholder="Location"
            type="text"
            style={{
              width: "200px",
              marginBottom: "-150px",
            }}
            value={Location}
            onChange={(e) => setVenue(e.target.value)}
          />

          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="SCHEDULE 2 (name)"
              style={{
                fontSize: "20px",
                marginRight: "500px",
                marginBottom: "10px",
                marginTop: "200px",
                width: "250px",
              }}
              onChange={(e) => setscheduletitle(e.target.value)}
            />
          </div>

          <div>
            <label>Date</label>
          </div>
          <input
            placeholder=" Date"
            type="text"
            style={{
              marginBottom: "100px",
              width: "200px",
              fontSize: "15px",
            }}
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div>
            <label>Time</label>
          </div>
          <input
            placeholder=" Time"
            type=" text"
            style={{
              width: "200px",
              marginBottom: "-150px",
            }}
            value={Time}
            onChange={(e) => setTime(e.target.value)}
          />

          <div>
            <label>Location</label>
          </div>
          <input
            placeholder="Location"
            type=" text"
            style={{
              width: "200px",
              marginBottom: "-150px",
            }}
            value={Location}
            onChange={(e) => setVenue(e.target.value)}
          />

          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="SCHEDULE 3 (name)"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                marginTop: "200px",
                width: "250px",
              }}
              onChange={(e) => setscheduletitle(e.target.value)}
            />
          </div>

          <div>
            <label>Date</label>
          </div>
          <input
            placeholder=" Date"
            type="text"
            style={{
              marginBottom: "100px",
              width: "200px",
              fontSize: "15px",
            }}
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div>
            <label>Time</label>
          </div>
          <input
            placeholder=" Time"
            type=" text"
            style={{
              width: "200px",
              marginBottom: "-150px",
            }}
            value={Time}
            onChange={(e) => setTime(e.target.value)}
          />

          <div>
            <label>Location</label>
          </div>
          <input
            placeholder="Location"
            type="text"
            style={{
              width: "200px",
              marginBottom: "-150px",
            }}
            value={Location}
            onChange={(e) => setVenue(e.target.value)}
          />

          <div>
            <div>
              <label>About</label>
            </div>
            <input
              placeholder="About"
              type="text"
              text
              style={{
                width: "200px",
                marginBottom: "-150px",
              }}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />

            <div>
              <label>About</label>
            </div>
            <input
              placeholder="About"
              type="text"
              text
              style={{
                width: "200px",
                marginBottom: "-150px",
              }}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />

            <div>
              <label>About</label>
            </div>
            <input
              placeholder="About"
              type="text"
              text
              style={{
                width: "200px",
                marginBottom: "-150px",
              }}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="Viewbutton">
        <button
          style={{
            marginTop: "-500px",
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
            marginLeft: "1150px",
          }}
        >
          View
        </button>

        <div className="Viewbutton">
          <button
            style={{
              marginTop: "150px",
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
              marginLeft: "1150px",
            }}
          >
            View
          </button>

          <div className="Viewbutton">
            <button
              style={{
                marginTop: "160px",
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
                marginLeft: "1150px",
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View_sch;
