import { db } from "../../config/firebase";
import { collection, query, where, getDocs,documentId, FieldPath } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import "./my_profile.css";
import Header from '../header/header';


const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setuserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsCollectionRef = collection(db, "user");
        const eventQuery = query(
          eventsCollectionRef,
          where(documentId(), "==", "new_id")
        );
        const querySnapshot = await getDocs(eventQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const imageUrl = userData.profile_pic;
          const firstname = userData.firstName;
          const lastname = userData.lastName;
          const moile = userData.mobile;
          const email = userData.email;
          const username = userData.username;

          setImageUrl(imageUrl);
          setFirstName(firstname);
          setLastName(lastname);
          setMobileNumber(moile);
          setEmail(email);
          setuserName(username);
        }
      } catch (error) {
        console.error("Error retrieving event data:", error);
      }
    };

    fetchEventData();
  }, []);


  return (
    <div className="my_profile" style={{ margin: "0vh auto ",width:"100vw",height:"100vh" }}>
      <div className="header"style={{
          maxWidth: "100vw",
          height: "10vh",
          backgroundColor: "#EDE7F1",
          marginBottom: "20px",
        }}>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          minHeight: "80vh",
          width: "50vw",
          padding: "10px",
          border: "3px solid",
          color: "#AF68EF",
          borderRadius: "15px",
          marginTop:"200px"
        }}
      >
        <div
          className="profile"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "30px",
            margin: "10px",
            color: "#F00000",
            marginTop: "10px",
            fontSize:"35px"
          }}
        >
          <h1 style={{ marginTop: "0px" }}> My Profile </h1>
        </div>

        <div>
          {imageUrl ? (
            <img src={imageUrl} style={{ width: "20vh", height: "20vh" }} />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/application%2Fprofile_icon.jpg?alt=media&token=3d7d6c73-5e54-447f-be3f-a91b15c4c542"
              style={{ width: "20vh", height: "20vh" }}
            />
          )}
        </div>

        <a
          href="#"
          type="submit"
          style={{
            position: "relative",
            display: "block",
            left: "20vw",
            top: "-23vh",
            margin: "4px",
            fontFamily: "Roboto",
            padding: "4px",
            fontSize: "1.5em",
            color: "#252525",
          }}
        >
          Edit
        </a>
        <form
          style={{ position: "relative", marginBottom: "10px" }}
        >
          <div>
            <input
              value={firstName}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "#CDC0D9",
                borderRadius: "20px",
                color: "#252525",
              }}
              type="text"
            />
          </div>
          <div>
            <input
              value={lastName}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "#CDC0D9",
                borderRadius: "20px",
                color: "#252525",
              }}
              type="text"
            />
          </div>
          <div>
            <input
              value={mobileNumber}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "#CDC0D9",
                borderRadius: "20px",
                color: "#252525",
              }}
              type="text"
            />
          </div>
          <div>
            <input
              value={email}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "#CDC0D9",
                borderRadius: "20px",
                color: "#252525",
              }}
              type="email"
            />
          </div>
          <div className="Myprofile">
            <auth />
          </div>
          <div>
            <input
              value={username}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "#CDC0D9",
                borderRadius: "20px",
                color: "#252525",
              }}
              type="text"
            />
          </div>

          <div className="Logoutbutton">
            <button
              style={{
                marginTop: "180px",
                margin: "4px auto",
                alignItems: "50%",
                width: "15vw",
                height: "5vh",
                display: "block",
                backgroundColor: "#7B43AC",
                fontFamily: "Roboto",
                fontSize: "17px",
                borderRadius: "20px",
                color: "#FFFFFF",
              }}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
