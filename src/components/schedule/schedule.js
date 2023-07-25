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


function Schedule() {
  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [schedulde_start, setscheduldeStart] = useState("");
  const [schedulde_end, setscheduldeEnd] = useState("");
  const [scheduletitle, setscheduletitle] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setnotification] = useState(false);
  const [description, setdescription] = useState("");

  const Ref = collection(db, "schedule");

  useEffect(() => {
    if (imageUrls.length > 0) {
      addscheduleToDatabase();
    }
  }, [imageUrls]);

  const addscheduleToDatabase = async () => {
    try {
      const scheduldeStart = new Date(schedulde_start);
      const scheduldeEnd = new Date(schedulde_end);
      await addDoc(Ref, {
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
      <div className="header">
        <Header />
      </div>
      <div className="sch_box">
        <p style={{ margin: "25px" }}>SCHEDULE</p>
      </div>
      <div
        className="schedule"
        style={{ display: "flex", flexDirection: "column" ,marginTop:'15vh'}}
      >
        <div
          className="schBody"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            className="schBody-left"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "35vh",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <input
                placeholder="SCHEDULE TITLE"
                style={{
                  border: "none",
                  background: "#EDE7F1",
                  fontWeight: "bolder",
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  textAlign: "center",
                }}
                onChange={(e) => setscheduletitle(e.target.value)}
              />
            </div>
            <div className="img_dis">
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="user-uploaded media"
                  style={{
                    position: "absolute",
                    height: "25vh",
                    width: "14vw",
                    border: "1px solid #7B43AC",
                    borderRadius: "10px",
                    objectFit: "cover",
                    left: "26.5vw",
                  }}
                />
              )}
                <input
                  type="file"
                  className="sch_img"
                  style={{
                    height: "25vh",
                    width: "14vw",
                    border: "1px solid #7B43AC",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/, video/"
                />
            </div>
          </div>
          <div
            className="schBody-right"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "35vh",
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
          style={{ display: "flex", justifyContent: "center" }}
        >
          <textarea
            placeholder=" Schedule Brief..."
            rows={"10"}
            cols={"60"}
            style={{
              borderRadius: "10px",
              box_sizing: "border-box",
              width: "65vw",
              height: "20vh",
              background: "#FFFFFF",
              border: "1px solid #000000",
              border_radius: "15px",
              resize: "none",
            }}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div
          className="savebutton"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onSubmit}
            style={{
              width: "130px",
              height: "40px",
              display: "block",
              backgroundColor: "#7B43AC",
              fontFamily: "Roboto",
              fontSize: "17px",
              borderRadius: "10px",
              color: "#FFFFFF",
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
