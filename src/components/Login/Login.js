import { Link,useNavigate} from "react-router-dom";
import React, { useState, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import firebase from "firebase";


import logo from "../../data/SharkUpLogoTwo.png";
import "./login.css";
import authContext from '../../utils/auth-hook'

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const auth = firebase.auth();
  const db = firebase.firestore();
  const navigate=useNavigate();
  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectRegistration, setRedirectRegistration] = useState(false);
  const authData = useContext(authContext)

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function handleSignin(event) {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user.emailVerified) {
          db.collection("Users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              if (snapshot.exists) {
                setRedirectHome(true);
                authData.authTriggered()
                console.log("hello");
              } else {
                setRedirectRegistration(true);
              }
            });
        } else {
          alert("Please verify your email");
        }
      })
      .catch((error) => {
        alert("ERROR : " + error.message);
      });
  }

  return (
    // <div className="auth-main">
    //   <ToastContainer />
    //   {redirectRegistration ? <Redirect to="/user/register" /> : null}
    //   {redirectHome ? <Redirect to="/" /> : null}
    //   <img src={logo} className="logo-auth" alt="logo" />
    //   <div className="auth-card-div">
    //     <Card className="auth-card">
    //       <h3 className="auth-title">Login</h3>
    //       <Form className="auth-form">
    //         <Form.Group>
    //           <Form.Control
    //             className="auth-input"
    //             type="text"
    //             name="email"
    //             placeholder="Email Address"
    //             value={credentials.email}
    //             onChange={handleChange}
    //           />
    //         </Form.Group>
    //         <Form.Group>
    //           <Form.Control
    //             className="auth-input"
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             value={credentials.password}
    //             onChange={handleChange}
    //           />
    //         </Form.Group>
    //         <Button onClick={handleSignin} className="auth-button">
    //           Login
    //         </Button>
    //       </Form>
    //       <p className="auth-bottom-text">
    //         New here?{" "}
    //         <Link className="auth-link" to="/signup">
    //           Sign Up
    //         </Link>
    //       </p>
    //     </Card>
    //   </div>
    // </div>
    <div>
    
      {redirectRegistration ? ()=>navigate("/user/register") : null}
      {redirectHome ? ()=>navigate("/") : null}
      <div className="section-log-a" id="contact">
        <div className="form-container-a">
          <img src={logo} className="form-img-a" alt="login" />
          <form onSubmit={handleSignin} className="contact-form-a">
            <h3>LOGIN</h3>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            {/* <p className="forgot">
              Forgot password? <Link to="/forgotpassword">Click Here</Link>{" "}
            </p> */}
            <input type="submit" value="Login" />
            <p>
              New here? No issue, kindly <Link to="/signup">Register here</Link>
            </p>
            <br />
            <hr className="line-bro" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;