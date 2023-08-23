import "./header.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";

const Header = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const usersCollectionRef = collection(db, "user");
        const usernameQuery = query(
          usersCollectionRef,
          where(documentId(), "==", "new_id")
        );
        const querySnapshot = await getDocs(usernameQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const imageUrl = userData.profile_pic;
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
    <div style={{ height: "0vh", maxWidth: "100vw", position: "absolute",fontSize:"25px" }}>
      <div
        style={{
          backgroundColor: "#AF68EF",
          height: "10vh",
          maxWidth: "100vw",
        }}
      ></div>
      <div
        className="header"
        style={{
          maxWidth: "100vw",
          height: "11vh",
          marginBottom: "20px",
        }}
      >
        <header style={{ paddingTop: "0px" }}>
          <div
            className="navbar"
            style={{
              display: "flex",
              alignItems: "center",
              height: "12vh",
              width: "100vw",
            }}
          >
           
              <div style={{ marginLeft: "1vw" }}>
                <h1 style={{ color: "#D82323",fontSize:"40px",fontWeight:"600" }}>EVENTO</h1>
              </div>
              <nav style={{ display: "flex", marginLeft: "50vw" }}>
                <ul
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                    fontSize:"23px",
                  }}
                >
                  <Link to="/" style={{ margin: '1em' }}>Home</Link>
                  <Link to="/calendar" style={{ margin: '1em' }}>Calendar</Link>
                  <Link to="/aboutus" style={{ margin: '1em' }}>About Us</Link>
                  <Link to="/attendevents" style={{ margin: '1em' }}>Events</Link>
                  {/* <li style={{ margin: "1em" }}>Home</li>
                  <li style={{ margin: "1em" }}>Calendar</li>
                  <li style={{ margin: "1em" }}>About Us</li>
                  <li style={{ margin: "1em" }}>Events</li> */}
                </ul>
              </nav>

              <Link to="/myprofile" className="profile_icon">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    style={{
                      borderRadius: "50%",
                      maxWidth: "3.5vw",
                      maxHeight: "8vh",
                      margin: "3vh 0vw 3vh 1vw",
                    }}
                    alt=""
                  />
                ) : (
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/application%2Fprofile_icon.jpg?alt=media&token=3d7d6c73-5e54-447f-be3f-a91b15c4c542"
                    style={{
                      borderRadius: "50%",
                      maxWidth: "3.5vw",
                      maxHeight: "8vh",
                      margin: "3vh 0vw 3vh 1vw",
                    }}
                    alt=""
                  />
                )}
              </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
