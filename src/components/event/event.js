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
