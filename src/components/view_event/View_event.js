import React, { useState, useEffect } from 'react';
import "./View_event.css";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  documentId,
} from "firebase/firestore";
import Header from "../header/header";
import {
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const View_event = () => {

    const [imageUrl, setImageUrl] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventaddress, setEventAddress] = useState("");
    const [eventStart, setEventStart] = useState(null); // Initialize with null
  
    useEffect(() => {
      const fetchEventData = async () => {
        try {
          const eventsCollectionRef = collection(db, "event");
          const eventQuery = query(
            eventsCollectionRef,
            where(documentId(), "==", "prag")
          );
          const querySnapshot = await getDocs(eventQuery);
          if (!querySnapshot.empty) {
            const eventData = querySnapshot.docs[0].data();
            const imageUrl = eventData.Event_IMAGE;
            const eventname = eventData.Event_name;
            const eventaddress = eventData.Event_address;
            const eventStartTimestamp = eventData.Event_start;
  
            // Convert Firebase Timestamp to JavaScript Date
            const eventStartDate = eventStartTimestamp.toDate();
  
            setImageUrl(imageUrl);
            setEventName(eventname);
            setEventAddress(eventaddress);
            setEventStart(eventStartDate);
          }
        } catch (error) {
          console.error("Error retrieving event data:", error);
        }
      };
  
      fetchEventData();
    }, []);
  
    const formatDate = (date) => {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className='view_event'>
            <div className='header_view_event'>
          <Header />
          </div>
          <div className="event_img">
            {imageUrl ? (
              <img
                src={imageUrl}
                style={{
                  display: "unset",
                  marginTop: "20vh",
                  width: "10vw",
                  height: "20vh",
                }}
                alt="Event"
              />
            ) : (
              <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066" alt="Placeholder" />
            )}
            <h3>{eventName}</h3>
            <h3>{eventaddress}</h3>
            {eventStart && <h3>{formatDate(eventStart)}</h3>}
          </div>
          
        </div>
      );      
}

export default View_event;
