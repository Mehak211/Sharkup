import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";
const root = ReactDOM.createRoot(document.getElementById('root'));

const firebaseConfig = {
  apiKey: "AIzaSyDVWdiQ7WeXUFJHbjbO4hrP8zpy6IH_1T0",
  authDomain: "sharkup-171a4.firebaseapp.com",
  projectId: "sharkup-171a4",
  storageBucket: "sharkup-171a4.appspot.com",
  messagingSenderId: "369256463481",
  appId: "1:369256463481:web:b204b436012c34972168a8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
