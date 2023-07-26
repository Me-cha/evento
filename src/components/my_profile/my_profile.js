import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import "./my_profile.css";
import Header from '../header/header';


const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const usersCollectionRef = collection(db, "user");
        const usernameQuery = query(
          usersCollectionRef,
          where("username", "==", "nosh123")
        );
        const querySnapshot = await getDocs(usernameQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const imageUrl = userData.profile_image;
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Perform update logic here
    console.log("Profile updated:", {
      firstName,
      lastName,
      mobileNumber,
      email,
      designation,
    });
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logged out");
  };

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
            color: "#182EF2",
          }}
        >
          Edit
        </a>
        <form
          style={{ position: "relative", marginBottom: "10px" }}
          onSubmit={handleUpdate}
        >
          <div>
            <input
              placeholder="First Name"
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
                color: "182EF2",
              }}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Last Name"
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
                color: "182EF2",
              }}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Mobile Number"
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
                color: "182EF2",
              }}
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Email"
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
                color: "182EF2",
              }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Myprofile">
            <auth />
          </div>
          <div>
            <input
              placeholder="Designation"
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
                color: "182EF2",
              }}
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
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
