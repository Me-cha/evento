import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import Header from "../header/header";
import ShareBtn from "../share/share";
import Calendar from "../Calendar/Calendar";
import "./event_dis.css";

function Event_dis() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsCollectionRef = collection(db, "event");
        const eventQuerySnapshot = await getDocs(eventsCollectionRef);

        if (!eventQuerySnapshot.empty) {
          const eventList = [];
          eventQuerySnapshot.forEach((doc) => {
            const eventData = doc.data();
            const imageUrl = eventData.Event_IMAGE;
            const eventname = eventData.Event_name;
            const eventaddress = eventData.Event_address;
            const eventStartTimestamp = eventData.Event_start;
            const eventStartDate = eventStartTimestamp.toDate();

            eventList.push({
              imageUrl,
              eventname,
              eventaddress,
              eventStartDate,
            });
          });

          setEvents(eventList);
        }
      } catch (error) {
        console.error("Error retrieving event data:", error);
      }
    };

    fetchEventData();
  }, []);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      className="Event_dis"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="header">
        <Header />
      </div>
      <div className="box" style={{ display: "flex", flexDirection: "row"}}>
        <h3 style={{ margin: "4vh 0vw 0vh 15vw" }}>CALENDAR</h3>
        <h3 style={{ margin: "4vh 0vw 0vh 40vw" }}>EVENTS</h3>
      </div>
      <div
        className="body_view_event"
        style={{ display: "flex", flexDirection: "row" ,height:"70vh"}}
      >
      
        <Calendar />
        <div
          className="event_list"
          id="style-2"
          style={{
            margin: "25vh auto auto 17vw",
            display: "unset",
            border: "2px solid black",
            height: "60vh", // Set a fixed height for the event list
            width: "35vw",
            backgroundColor: "#E3D4EF",
            overflow: "auto", // Add overflow property for scrolling
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {events.map((event, index) => (
            <button
              className="event_item"
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "2vh 0vw 0vh 1vw",
                border: "2px solid black",
                borderRadius: "10px",
                width: "30vw",
                height: "17vh",
              }}
            >
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  style={{
                    display: "unset",
                    margin: "auto 2vw",
                    width: "15vh",
                    height: "14vh",
                    border: "1px solid black",
                    borderRadius: "10px",
                    objectFit: "fit",
                  }}
                  alt="Event"
                />
              ) : (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                  style={{
                    display: "unset",
                    margin: "auto 2vw",
                    width: "15vh",
                    height: "14vh",
                    border: "1px solid black",
                    borderRadius: "10px",
                    objectFit: "fit",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "2vh 0vw -1vh 4vw",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    color: "red",
                    fontSize: "25px",
                    fontWeight: "600",
                    marginTop: "-1.5vh",
                    textTransform: "uppercase",
                  }}
                >
                  {event.eventname}
                </h1>
                <h1
                  style={{
                    fontSize: "23px",
                    fontWeight: "600",
                    marginTop: "-1vh",
                    textTransform: "capitalize",
                  }}
                >
                  {event.eventaddress}
                </h1>
                {event.eventStartDate && (
                  <h1
                    style={{
                      fontSize: "20px",
                      marginTop: "0.5vh",
                      borderTop: "1.5px solid black",
                    }}
                  >
                    {formatDate(event.eventStartDate)}
                  </h1>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="sharebtn"><ShareBtn />
      </div>
    </div>
  );
}

export default Event_dis;
