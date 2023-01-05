import React, { useEffect,useState,useContext } from 'react'
import "./investorLogin.css";
import firebase from "firebase";
import authContext from "../../utils/auth-hook";
import { Link, useNavigate } from "react-router-dom";
function InvestorLogin() {
     const [credentials, setCredentials] = useState({
       email: "",
       password: "",
     });
    const navigate = useNavigate();
     const auth = firebase.auth();
     const [redirect, setRedirect] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectRegistration, setRedirectRegistration] = useState(false);
  const authData = useContext(authContext);
   const db = firebase.firestore();
    useEffect(()=>{
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container");

        signUpButton.addEventListener("click", () =>
          container.classList.add("right-panel-active")
        );

        signInButton.addEventListener("click", () =>
          container.classList.remove("right-panel-active")
        );
    },[]);

function handleSignup(event) {
  event.preventDefault();
  auth
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      user
        .sendEmailVerification()
        .then(() => {
          alert("Check your email inbox !!!");
          setCredentials({ email: "", password: "" });
        })
        .catch((e) => {
          alert("ERROR : " + e.message);
        });
      auth.signOut();
    })
    .catch((err) => {
      alert("ERROR : " + err.message);
    });
}
function handleSignin(event) {
  event.preventDefault();
  console.log("sign in");
  auth
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      if (user.emailVerified) {
        db.collection("Investors")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setRedirectHome(true);
              authData.authTriggered();
            } else {
              setRedirectRegistration(true);
              console.log("Afa");
              navigate("/investor/register");
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
const handleChange = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  setCredentials((prev) => {
    return { ...prev, [name]: value };
  });
};

  return (
    <div>
      {redirectRegistration ? () => navigate("/investor/register") : null}
      {redirectHome ? () => navigate("/") : null}
      <div className="containerr" id="container">
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
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
            <button onClick={handleSignup}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form >
            <h1>Sign in</h1>

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
            <a href="#">Forgot your password?</a>
            <button onClick={(e)=>handleSignin(e)}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Investor!</h1>
              <p>Enter your personal details and grow with us!</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorLogin