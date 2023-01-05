import React, { useState, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import firebase from "firebase";
import "./userRegistration.css";
import "../Login/login.css";
import "../signup/signup.css";
import Imageupload from "./Imageupload";
import { useNavigate } from "react-router-dom";
import authContext from "../../utils/auth-hook";

function InvestorRegistration() {

    let navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
      name: "",
      industry: "",
      fundingRange: "",
      desc: "",
    });
      const [profileImage, setProfileImage] = useState(null);
      const types = ["image/png", "image/jpeg", "image/jpg"];
      const auth = firebase.auth();
      const db = firebase.firestore();
      const storage = firebase.storage();
      const [registered, setRegistered] = useState(false);
      const authData = useContext(authContext);

const handleChange = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  setUserDetails((prev) => {
    return { ...prev, [name]: value };
  });
};

    const registerUser = (event) => {
      event.preventDefault();
      auth.onAuthStateChanged((userCredentials) => {
        const uid = userCredentials.uid;
        const uploadTask = storage.ref("Investors/" + uid).put(userDetails.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (err) => {
            console.log(err.message);
          },
          () => {
            storage
              .ref("Investors")
              .child(uid)
              .getDownloadURL()
              .then((imageUrl) => {
                db.collection("Investors")
                  .doc(uid)
                  .set({
                    name: userDetails.name,
                    industry: userDetails.industry,
                    fundingRange: userDetails.fundingRange,
                    imageUrl: imageUrl,
                    desc: userDetails.desc,
              
                  })
                  .then(() => {
                    setRegistered(true);
                    authData.authTriggered();
                  });
              });
          }
        );
      });
    };
  return (
    <div>
      <div className="mainn">
        {registered ? navigate("/") : null}
        <div className="section-log-ax" id="contact">
          <div className="register_main">
            <form onSubmit={registerUser} className="register_form">
              <h3>INVESTOR REGISTRATION</h3>
              <Imageupload center="true" setData={setUserDetails} />
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="industry"
                placeholder="Your Industry"
                value={userDetails.industry}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Funding Range"
                name="fundingRange"
                value={userDetails.range}
                onChange={handleChange}
              />
              
              <input
                type="textarea"
                name="desc"
                placeholder="Description"
                value={userDetails.desc}
                onChange={handleChange}
              />

              {/* <Form.Group style={{ textAlign: "left" }}>
               <Form.File
                 id="userImage"
                 label="Profile Picture"
                 onChange={handleProfileImageChange}
               />
             </Form.Group> */}
              <input className="submit_btn" type="submit" value="Register" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorRegistration