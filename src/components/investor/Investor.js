import React, { useEffect,useState } from 'react'
import firebase from 'firebase'
import Card from "../Cards/Card";
function Investor() {
    const [startupData,setStartupData]=useState([]);
    const db=firebase.firestore();
    useEffect(()=>{
      setStartupData([]);
db.collection("Users").get().then((querySnapshot) => {
    if (querySnapshot) {
      querySnapshot.docs.map((doc) => {
        setStartupData((prev) => {
          return [...prev, doc.data()];
        });
      });
      console.log(startupData);
    }});
    },[]);
  return (
    <div>


    </div>
  )
}

export default Investor