// import "./event.css";
// import React, { useState, useEffect } from "react";
// import { storage, db } from "../../config/firebase";

// import {
//   setDoc,
//   collection,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
// import { v4 } from "uuid";
// import Header from "../header/header";

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

//   // const Ref = collection(db, "event",eventName);
//   // await setDoc(Ref,`{eventname}`);

//   useEffect(() => {
//     if (imageUrls.length > 0) {
//       addEventToDatabase();
//     }
//   }, [imageUrls]);

//   const addEventToDatabase = async () => {
//     try {
//       const EventStart = new Date(event_start);
//       const EventEnd = new Date(event_end);
//       await setDoc(doc(db, "event",eventName), {
//         Event_name: eventName,
//         Event_brief: eventBrief,
//         Event_organizor: eventorganizor,
//         Event_address: eventvenue,
//         Event_Contact: organizor_contact,
//         Event_start: EventStart,
//         Event_end: EventEnd,
//         Event_notification: eventnotification,
//         Event_IMAGE: imageUrls[0],
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpload = () => {
//     if (file == null) return null;
//     const imageRef = ref(storage, `event/${file.name}.${v4()}`);
//     uploadBytes(imageRef, file).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageUrls([url]);
//       });
//     });
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





import React, { useState } from 'react';
import Header from "../header/header";

function EventInput() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [plannerFirstName, setPlannerFirstName] = useState('');
  const [plannerLastName, setPlannerLastName] = useState('');
  const [venue, setVenue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [notification, setNotification] = useState(false);

  const handleAddSchedule = () => {
    // Logic to add schedule
  };

  const handleCreateEvent = () => {
    // Logic to create event
  };
 
  return (
    <div
    style={{width: "100vw", height: "100vh", backgroundColor: "#EDE7F1" }}
  >
    <div className="header">
      <Header />
    </div>
    <div style={{ padding: '135px' }}>

      <div>
      <div> <label htmlFor="eventTitle">Event Title</label></div>
        <input  placeholder=" Event Title" type="text" id="eventTitle" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
      </div>

      <div>
       <div><label htmlFor="eventCategory">Event Category</label></div> 
        <input placeholder=" Event Category"  type="text" id="eventCategory" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} />
      </div>

      <div>
      <label>Planner</label>
          <div>
            <input  placeholder=" First Name" type="text"  value={plannerFirstName} onChange={(e) => setPlannerFirstName(e.target.value)} />
            <input placeholder=" Last Name"  type="text" value={plannerLastName} onChange={(e) => setPlannerLastName(e.target.value)} />
          </div>
      </div>

      <div>
       <div> <label htmlFor="venue">Venue</label></div>
        <input type="text" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
      </div>
      
      <div>
        <label>EVENT DATES</label>
     <div>
       <div><label>Start Date</label></div>
         <input  placeholder=" Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        
         <div><label>Start Time</label></div>
        <input placeholder=" Start Time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
       
        <div><label>End Date</label></div>
        <input placeholder=" End Date"  type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
       
       <div><label>End Time</label></div>
        <input  placeholder="End Time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
         </div>
      </div>

      <div>
        <div><label>Time Zone</label></div>
        <input  placeholder=" Time Zone" type="text" id="timeZone" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
      </div>

      <div>
        <label>
          <input type="checkbox" checked={notification} onChange={(e) => setNotification(e.target.checked)} />
          Notifications
        </label>
      </div>

      <div>
      <div>
        <label>SCHEDULES</label>
      </div>
      <div>
       <button onClick={handleAddSchedule}>Add Schedule</button>
      </div>
      </div>

      <div>
        <button 
        style={{
          margin: "16vh auto",
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
        onClick={handleCreateEvent}>Create Event</button>
      </div>
    </div>
</div>
    
  );
}

export default EventInput;
