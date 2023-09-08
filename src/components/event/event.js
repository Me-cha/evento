import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import {
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
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
import "./event.css";

function EventInput() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [plannerFirstName, setPlannerFirstName] = useState("");
  const [plannerLastName, setPlannerLastName] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [notification, setNotification] = useState(false);
  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const handleAddSchedule = () => {
    // Logic to add schedule
  };


  useEffect(() => {
    if (imageUrls.length > 0) {
      addEventToDatabase();
    }
  }, [imageUrls]);

  const addEventToDatabase = async () => {
    try {

      const EventStart = new Date(startDate);
      const EventEnd = new Date(endDate);

      await setDoc(doc(db, "event", eventTitle), {
        Event_name: eventTitle,
        Event_category: eventCategory,
        Event_organizor: plannerFirstName+" "+plannerLastName,
        Event_venue: venue,
        Event_start: EventStart,
        Event_end: EventEnd,
        Event_notification: notification,
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

  return (
    <div>
      <div className="header_event_inp">
        <Header />
      </div>
      <form
        style={{
          padding: "3vh 4vw",
          margin: "14vh auto 2vh auto",
          border: "2px solid white",
          height: "105vh",
          width: "60vw",
          backgroundColor: "white",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
          Basic Information
        </div>

        <div className="EventMandatoryField">
          <div className="event_title">
            <label htmlFor="eventTitle">Event Title</label>
            <input
              placeholder=" Event Title"
              type="text"
              style={{
                width: "52vw",
              }}
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>

          <div className="event_category">
            <label htmlFor="eventCategory">Event Category</label>
            <br />
            <input
              placeholder=" Event Category"
              type="text"
              id="eventCategory"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
            />
          </div>

          <div className="event_plannner">
            <label>Planner</label>
            <br />
            <input
              placeholder=" First Name"
              type="text"
              style={{ marginRight: "3vw" }}
              value={plannerFirstName}
              onChange={(e) => setPlannerFirstName(e.target.value)}
            />
            <input
              placeholder=" Last Name"
              type="text"
              value={plannerLastName}
              onChange={(e) => setPlannerLastName(e.target.value)}
            />
          </div>
          <div className="location_Lable" style={{fontSize:"15pt",fontWeight:"600"}}>
            LOCATION
          </div>
          <div
            className="img_dis"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "10vh",
              width: "10vw",
              border: "none",
              alignItems: "center",
              top: "-23vh",
              left: "46vw",
            }}
          >
            {file && (
              <a href={URL.createObjectURL(file)} target="_blank">
                <img
                  src={URL.createObjectURL(file)}
                  alt="user-uploaded media"
                  style={{
                    position: "relative",
                    right: "11vw",
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
                margin: "10vh 0vw 0vh 10vw",
              }}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*, video/*"
            />
          </div>
        </div>

        <div className="EventDescription">
          <div>
            <label htmlFor="venue">Venue</label>
            <br />
            <input
              type="text"
              placeholder="  venue"
              value={venue}
              style={{ width: "52vw" }}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div style={{fontSize:"15pt",fontWeight:"600"}}>EVENT DATES</div>
          <div
            className="EventDates"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <label>Event Start</label>
              <br />
              <input
                placeholder=" Event Start"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label>Event End</label>
              <br />
              <input
                placeholder=" Event End"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div>
              <label>Time Zone</label>
            </div>
            <input
              placeholder=" Time Zone"
              type="text"
              id="timeZone"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <div style={{fontSize:"15pt",fontWeight:"600"}}>SCHEDULES</div>
          </div>
          <div>
            <button style={{marginLeft:"10vw",}} onClick={handleAddSchedule}>Add Schedule</button>
          </div>
        </div>

        <div style={{ margin:"auto 20vw" }}>
          <input
            type="checkbox"
            checked={notification}
            style={{ height: "auto",margin:"auto 0.5vw" }}
            onChange={(e) => setNotification(e.target.checked)}
          />
          <label style={{color:"black"}}>Notifications</label>
        </div>
      </form>
      <div>
        <button
          style={{
            margin: "2vh auto 0vh auto",
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
          onClick={handleUpload}
        >
          Create Event
        </button>
      </div>
    </div>
  );
}

export default EventInput;

// const EventInput = () => {
//   const [eventName, setEventName] = useState("");
//   const [eventBrief, setEventbrief] = useState("");
//   const [eventorganizor, setEventorganizor] = useState("");
//   const [eventvenue, setEventvenue] = useState("");
//   const [event_start, seteventStart] = useState("");
//   const [event_end, seteventEnd] = useState("");
//   const [organizor_contact, setorganizor_contact] = useState(0);
//   const [eventnotification, setEventnotification] = useState(false);
//   const [file, setFile] = useState("");
//   const [imageUrls, setImageUrls] = useState([]);

//   const onSubmit = () => {
//     handleUpload();
//   };

//   return (
//     <div
//       style={{ width: "100vw", height: "100vh", backgroundColor: "#EDE7F1" }}
//     >
//       <div className="header">
//         <Header />
//       </div>
//       <div className="box">
//         <p style={{ marginTop: "4vh" }}>EVENTS</p>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           flexDirection: "row",
//           width: "80vw",
//           margin: "4vh 0vw auto 20vw",
//           position: "relative",
//           top: "22vh",
//         }}
//       >
//         <div className="input1">
//           <div style={{ marginLeft: "1vw" }}>
//             {/* EVENT name */}
//             <input
//               placeholder="Event Name"
//               style={{
//                 border: "none",
//                 background: "#EDE7F1",
//                 fontWeight: "bolder",
//                 fontSize: "20px",
//                 fontFamily: "Roboto",
//                 textAlign: "center",
//               }}
//               onChange={(e) => setEventName(e.target.value)}
//             />
//           </div>

//           <div style={{ marginTop: "10px" }}>
//             <textarea
//               placeholder=" Event Brief..."
//               rows={"10"}
//               cols={"40"}
//               style={{ borderRadius: "10px", resize: "none" }}
//               onChange={(e) => setEventbrief(e.target.value)}
//             />
//           </div>

//           <div style={{ marginTop: "10px", marginLeft: "50px" }}>
//             <div>
//               <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
//                 Organizor Name
//               </label>
//             </div>
//             <input
//               placeholder="Organizor name..."
//               onChange={(e) => setEventorganizor(e.target.value)}
//             />
//           </div>

//           <div style={{ marginTop: "10px", marginLeft: "50px" }}>
//             <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
//               DATE-TIME
//             </label>
//           </div>

//           <div className="date" style={{ marginLeft: "15px" }}>
//             <label style={{ fontSize: "13px" }}> Start : </label>
//             <input
//               type="datetime-local"
//               onChange={(e) => seteventStart(e.target.value)}
//             />
//           </div>

//           <div style={{ marginTop: "10px", marginLeft: "20px" }}>
//             <label style={{ fontSize: "13px" }}> End : </label>
//             <input
//               type="datetime-local"
//               onChange={(e) => seteventEnd(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="input2" style={{ marginLeft: "20vw" }}>
//           <div
//             className="img_dis"
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               height: "30vh",
//               width: "35vw",
//               paddingLeft: "4vw",
//               border: "none",
//               alignItems: "center",
//               top: "4vh",
//             }}
//           >
//             {file && (
//               <a href={URL.createObjectURL(file)} target="_blank">
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt="user-uploaded media"
//                   style={{
//                     position: "relative",
//                     right: "15vw",
//                     width: "15vw",
//                     height: "30vh",
//                     border: "1px solid #7B43AC",
//                     borderRadius: "10px",
//                     objectFit: "cover",
//                   }}
//                 />
//               </a>
//             )}
//             <input
//               type="file"
//               className="eventIMG"
//               style={{
//                 position: "absolute",
//                 height: "30vh",
//                 width: "15vw",
//                 marginTop: "25vh",
//               }}
//               onChange={(e) => setFile(e.target.files[0])}
//               accept="image/*, video/*"
//             />
//           </div>

//           <div style={{ marginTop: "7vh", marginLeft: "50px" }}>
//             <div>
//               <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
//                 Venue
//               </label>
//             </div>
//             <input
//               placeholder="Venue..."
//               onChange={(e) => setEventvenue(e.target.value)}
//             />
//           </div>

//           <div style={{ marginTop: "10px", marginLeft: "50px" }}>
//             <div>
//               <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
//                 Phone
//               </label>
//             </div>
//             <input
//               placeholder="Contact number..."
//               type="number"
//               onChange={(e) => setorganizor_contact(e.target.value)}
//             />
//           </div>

//           <div style={{ marginTop: "10px", marginLeft: "50px" }}>
//             <input
//               type="checkbox"
//               checked={eventnotification}
//               onChange={(e) => setEventnotification(e.target.checked)}
//             />
//             <label> Notification</label>
//           </div>
//         </div>
//       </div>
//       <div className="savebutton">
//         <button
//           onClick={onSubmit}
//           style={{
//             margin: "22vh auto",
//             width: "150px",
//             height: "50px",
//             display: "block",
//             backgroundColor: "#7B43AC",
//             fontFamily: "Roboto",
//             fontSize: "23px",
//             fontWeight: "500",
//             borderRadius: "10px",
//             color: "#FFFFFF",
//           }}
//         >
//           SAVE
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventInput;
