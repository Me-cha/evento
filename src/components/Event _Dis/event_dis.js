import React from "react";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from '../header/header';


function Event_dis() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const usersCollectionRef = collection(db, "event");
        const usernameQuery = query(
          usersCollectionRef,
          where("Event_name", "==", "mjuhl")
        );
        const querySnapshot = await getDocs(usernameQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const imageUrl = userData.Event_IMAGE;
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error retrieving image URL:", error);
      }
    };
    fetchImageUrl();

    // Clean up the Firestore listener when the component is unmounted
    return () => {
      // No listener to clean up in this case, but you can add it if needed
    };
  }, []);

  



  return (
    <div className="Event_dis">
      <div className="header">
        <Header />
      </div>
      <div className="event_img">
      {imageUrl ? <img src={imageUrl} style={{ width:"20vh",height:"20vh"}}/>: <img src=""/>}
    </div>
    </div>
  );
}

export default Event_dis;

/*

      
            

*/
