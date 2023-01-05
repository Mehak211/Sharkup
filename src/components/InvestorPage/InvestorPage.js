import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Card from "../Cards/Card";
import "./investorPage.css";
import {Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoCarSportOutline, IoFastFoodOutline } from "react-icons/io5";
import { GiBookshelf, GiLipstick } from "react-icons/gi";
import {GrCloudComputer} from "react-icons/gr";
import {HiUserGroup} from "react-icons/hi";
function Investor() {
  const [investorData, setInvestorData] = useState([]);
  const [filteredData,setFilteredData]=useState([]);
  const [selected,setSelected]=useState("All");
  const [show,setShow]=useState(false);
const [openData,setOpenData]=useState({});
  const db = firebase.firestore();

  function openModal(d){
    setShow(true);
    setOpenData(d);
  }
  function closeModal(){
    setShow(false);
    setOpenData({});
  }

  useEffect(() => {
   fetchData();
  }, []);

  function handleClick(name){
    if(name==="All"){
        setSelected("All");
    }
    if (name === "Automobile") {
      setSelected("Automobile");
    }
    if (name === "Education") {
      setSelected("Education");
    }
    if (name === "IT") {
    setSelected("IT");
    } 
    if (name === "Cosmetics") {
      setSelected("Cosmetics");
    } 
    if (name === "Food") {
      setSelected("Food");
    }

    if(name==="All"){
        setFilteredData(investorData);
    }else{
let sample = [];
investorData.map((d) => {
  if (d.industry === name) {
    sample.push(d);
  }
});
setFilteredData(sample);
    }
    
  }

  function fetchData(){
     setInvestorData([]);
     const documents = [];
     db.collection("Investors")
       .get()
       .then((querySnapshot) => {
         if (querySnapshot) {
           querySnapshot.docs.forEach((doc) => {
             documents.push(doc.data());
             });
           setInvestorData(documents);
           setFilteredData(documents);
           console.log(investorData);
         }
       });
       
  }
  return (
    <div className="investors_main">
      <h1>All Investors</h1>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <h1 style={{ fontSize: "30px", marginLeft: "120px" }}>
            Inverstor Details
          </h1>
        </Modal.Header>
        <Modal.Body>
          <div className="modal_main">
            <img className="modal_img" src={openData.imageUrl} />
            <div className="modal_details">
              <div className="card_left">
                <p>
                  Name <span>: {openData.name}</span>
                </p>
                <p>
                  Industry <span>: {openData.industry}</span>
                </p>
                <p>
                  Funding Range <span>: {openData.fundingRange}</span>
                </p>
                <p>
                  Description <span>: {openData.desc}</span>
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="tabs">
        <div
          className={selected === "All" ? "single_tab active" : "single_tab"}
          onClick={() => handleClick("All")}
        >
          <HiUserGroup className="tab_icon" />
          <p>All</p>
        </div>
        <div
          className={
            selected === "Automobile" ? "single_tab active" : "single_tab"
          }
          onClick={() => handleClick("Automobile")}
        >
          <IoCarSportOutline className="tab_icon" />
          <p>Automobile</p>
        </div>
        <div
          className={
            selected === "Education" ? "single_tab active" : "single_tab"
          }
          onClick={() => handleClick("Education")}
        >
          <GiBookshelf className="tab_icon" />
          <p>Education</p>
        </div>
        <div
          className={selected === "IT" ? "single_tab active" : "single_tab"}
          onClick={() => handleClick("IT")}
        >
          <GrCloudComputer className="tab_icon" />
          <p>IT</p>
        </div>
        <div
          className={
            selected === "Cosmetics" ? "single_tab active" : "single_tab"
          }
          onClick={() => handleClick("Cosmetics")}
        >
          <GiLipstick className="tab_icon" />
          <p>Cosmetics</p>
        </div>
        <div
          className={selected === "Food" ? "single_tab active" : "single_tab"}
          onClick={() => handleClick("Food")}
        >
          <IoFastFoodOutline className="tab_icon" />
          <p>Food</p>
        </div>
      </div>
      <div className="all_cards">
        {filteredData.map((d, index) => (
          <div onClick={() => openModal(d)}>
            <Card data={d} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Investor;
