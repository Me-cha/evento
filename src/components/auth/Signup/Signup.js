import React, { useState, useEffect } from "react";
import * as Components from "./Components";
//import firebase from 'firebase/compat/app'
import "react-phone-input-2/lib/style.css";
import CallOtp from "./CallOtp";
import { toast, Toaster } from "react-hot-toast";
import { db } from "../../../config/firebase";
import { getDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

var custom_id;

const Signup = () => {
  console.log(db);
  const navigate = useNavigate(); 
  const userCollectionRef = collection(db, "user");
  const [users,setUsers]=useState([])
  
  const [signIn, toggle] = useState(true);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    username: ""
  });
  
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  
  
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    }; 

    getUsers()
  }, []);

  const CheckUser = (name,mail)=>{

    users.map((user) =>{
      var checkUsername=user.username
      var checkEmail=user.email
      if (checkUsername===name){
        setSubmitButtonDisabled(!submitButtonDisabled)
        toast.error("Username is already taken!")
      }
      else if(checkEmail===mail){
        setSubmitButtonDisabled(!submitButtonDisabled)
        toast.error("Email is already taken!")
      }
    })

  }

  //const docRef = doc(db,"user",values.mobile);
  //setCustom_id(toString(values.mobile)) ;
  //console.log(custom_id);
  //console.log(values.mobile);
  //const [custom_id,setCustom_id]=useState("")
  
  const SendData = async ()=>{
    
    const docSnap = await getDoc(doc(db,"user",values.mobile));
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      toast.error("Mobile Number Already Exists!");
      toggle(true);
    } 

    else if(submitButtonDisabled===true){
        //CheckUser();
    }
    else
    {
      await setDoc (doc(db,"user",values.mobile), 
      { 
        firstName: values.firstName,
        lastName:values.lastName,
        mobile: Number(values.mobile),
        email: values.email,
        username: values.username 
      });
    }

  }

  const handleSubmission = () => {
    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.mobile ||
      !values.username
    ) {
      setErrorMsg("Fill all fields");
      toast.error("Fill all fields");
      setSubmitButtonDisabled(!submitButtonDisabled)
      
    }
    else{
      
      SendData();
      setSubmitButtonDisabled(!submitButtonDisabled);
      //navigate("/");
      setValues({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        username: ""});
      toggle(true);
      //console.log(submitButtonDisabled);

    }
    var custom_id=values.mobile;
    console.log(custom_id)
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Head>EVENTO</Components.Head>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            name="firstname"
            value={values.firstName}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, firstName: event.target.value }))}
            placeholder="First Name"
          />
          <Components.Input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, lastName: event.target.value }))}
            placeholder="Last Name"
          />
          <Components.Input
            type="text"
            name="mobile"
            value={values.mobile}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, mobile: event.target.value }))}
            placeholder="Mobile Number"
          />
          <Components.Input
            type="email"
            name="email"
            value={values.email}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
          />
          <Components.Input
            type="text"
            name="username"
            value={values.username}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, username: event.target.value }))}
            placeholder="Username"
          />

          <Components.Button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Sign Up
          </Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Head>EVENTO</Components.Head>
        <Components.SignTitle>Sign In !</Components.SignTitle>

        <CallOtp />
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>New Here ?</Components.Title>
            <Components.Paragraph>
              Signup and Discover New Events and Opportunities !
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              Happy to Assist your Schedule.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export { custom_id };
export default Signup;
