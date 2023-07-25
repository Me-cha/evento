import "./event.css";
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


const EventInput = () => {
  const [eventName, setEventName] = useState("");
  const [eventBrief, setEventbrief] = useState("");
  const [eventorganizor, setEventorganizor] = useState("");
  const [eventvenue, setEventvenue] = useState("");
  const [event_start, seteventStart] = useState("");
  const [event_end, seteventEnd] = useState("");
  const [organizor_contact, setorganizor_contact] = useState(0);
  const [eventnotification, setEventnotification] = useState(false);
  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const Ref = collection(db, "event");

  useEffect(() => {
    if (imageUrls.length > 0) {
      addEventToDatabase();
    }
  }, [imageUrls]);

  const addEventToDatabase = async () => {
    try {
      const EventStart = new Date(event_start);
      const EventEnd = new Date(event_end);
      await addDoc(Ref, {
        Event_name: eventName,
        Event_brief: eventBrief,
        Event_organizor: eventorganizor,
        Event_address: eventvenue,
        Event_Contact: organizor_contact,
        Event_start: EventStart,
        Event_end: EventEnd,
        Event_notification: eventnotification,
        Event_IMAGE: imageUrls[0],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    if (file == null) return null;
    const imageRef = ref(storage, `event/${file.name}.${v4()}`);
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
    <div style={{width:"100vw",height:"auto"}}>
      <div className="header">
        <Header />
      </div>
      <div className="box">
        <p style={{ marginTop:"4vh"}}>EVENTS</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "80vw",
          margin: "4vh 0vw auto 10vw",
          position:"relative"
        }}
      >
        <div className="input1">
          <div style={{ marginLeft: "18%" }}>
            {/* EVENT name */}
            <input
              placeholder="Event Name"
              style={{
                border: "none",
                background: "#EDE7F1",
                fontWeight: "bolder",
                fontSize: "16px",
                fontFamily: "Roboto",
                textAlign: "center",
              }}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <textarea
              placeholder=" Event Brief..."
              rows={"10"}
              cols={"40"}
              style={{ borderRadius: "10px", resize: "none" }}
              onChange={(e) => setEventbrief(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px", marginLeft: "50px" }}>
            <div>
              <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
                Organizor Name
              </label>
            </div>
            <input
              placeholder="Organizor name..."
              onChange={(e) => setEventorganizor(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px", marginLeft: "50px" }}>
            <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
              DATE-TIME
            </label>
          </div>

          <div className="date" style={{ marginLeft: "15px" }}>
            <label style={{ fontSize: "13px" }}> Start : </label>
            <input
              type="datetime-local"
              onChange={(e) => seteventStart(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px", marginLeft: "20px" }}>
            <label style={{ fontSize: "13px" }}> End : </label>
            <input
              type="datetime-local"
              onChange={(e) => seteventEnd(e.target.value)}
            />
          </div>
        </div>

        <div className="input2">
          <div
            className="img_dis"
            style={{
              display: "flex",
              flexWrap: "wrap",
              height: "30vh",
              width: "15vw",
              paddingLeft: "20vw",
              border: "none",
              alignItems: "center",
              top:"5vh",
              left :"-2vw"
            }}
          >
            {file && (
              <a href={URL.createObjectURL(file)} target="_blank">
                <img
                  src={URL.createObjectURL(file)}
                  alt="user-uploaded media"
                  style={{
                    position: "relative",
                    right: "15vw",
                    width: "15vw",
                    height: "30vh",
                    border: "1px solid #7B43AC",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </a>
            )}
            <input
              type="file"
              className="eventIMG"
              style={{
                position: "absolute",
                height: "30vh",
                width: "15vw",
                marginTop: "25vh",
                width: "30px",
              }}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*, video/*"
            />
          </div>

          <div style={{ marginTop: "7vh", marginLeft: "50px" }}>
            <div>
              <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
                Venue
              </label>
            </div>
            <input
              placeholder="Venue..."
              onChange={(e) => setEventvenue(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px", marginLeft: "50px" }}>
            <div>
              <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
                Phone
              </label>
            </div>
            <input
              placeholder="Contact number..."
              type="number"
              onChange={(e) => setorganizor_contact(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px", marginLeft: "50px" }}>
            <input
              type="checkbox"
              checked={eventnotification}
              onChange={(e) => setEventnotification(e.target.checked)}
            />
            <label> Notification</label>
          </div>
        </div>
      </div>
      <div className="savebutton">
        <button
          onClick={onSubmit}
          style={{
            margin: "auto",
            alignItems: "",
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
  );
};

export default EventInput;
