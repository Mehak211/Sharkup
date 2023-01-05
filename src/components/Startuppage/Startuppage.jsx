import styles from "./startuppage.module.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import newEduLogo from "../../data/newEduLogo.png";
import newEduGraph from "../../data/newEduGraph.png";
import cosmexLogo from "../../data/cosmexLogo.png";
import cosmexGraph from "../../data/cosmexGraph.png";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Card from "../Cards/card2";
import "../InvestorPage/investorPage.css";
import {Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoCarSportOutline, IoFastFoodOutline } from "react-icons/io5";
import { GiBookshelf, GiLipstick } from "react-icons/gi";
import { GrCloudComputer } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi";

const Startuppage = () => {
  const [investorData, setInvestorData] = useState([]);
  const [show,setShow]=useState(false);
   const [filteredData, setFilteredData] = useState([]);
   const [selected, setSelected] = useState("All");
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


  function fetchData(){
     setInvestorData([]);
     const documents = [];
     db.collection("Users")
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

   function handleClick(name) {
     if (name === "All") {
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

     if (name === "All") {
       setFilteredData(investorData);
     } else {
       let sample = [];
       investorData.map((d) => {
         if (d.industry === name) {
           sample.push(d);
         }
       });
       setFilteredData(sample);
     }
   }

  const owlCarouselData = [
    {
      companyLogo: `${newEduLogo}`,
      companyName: "Newedu-e-Learning",
      companyDetailsOne: `Learning with Newedu is fun, and research shows that it works!
    With quick, bite-sized lessons, you’ll earn points and unlock
    new levels while gaining real- world communication skills.`,
      companyDetailsTwo: `Learning with Newedu is fun, and research shows that it works!
      With quick, bite-sized lessons, you’ll earn points and unlock
      new levels while gaining real- world communication skills.`,
      companyDetailsThree: `Learning with Newedu is fun, and research shows that it works!
      With quick, bite-sized lessons, you’ll earn points and unlock
      new levels while gaining real- world communication skills.`,
      marketingStrategyDetails: `Learning with Newedu is fun, and research shows that it works!
      With quick, bite-sized lessons, you’ll earn points and unlock
      new levels while gaining real- world communication skills.`,
      companyGraph: `${newEduGraph}`,
    },
    {
      companyLogo: `${cosmexLogo}`,
      companyName: "Cosmex",
      companyDetailsOne: `Learning with Newedu is fun, and research shows that it works!
      With quick, bite-sized lessons, you’ll earn points and unlock
      new levels while gaining real- world communication skills.`,
      companyDetailsTwo: `Learning with Newedu is fun, and research shows that it works!
        With quick, bite-sized lessons, you’ll earn points and unlock
        new levels while gaining real- world communication skills.`,
      companyDetailsThree: `Learning with Newedu is fun, and research shows that it works!
        With quick, bite-sized lessons, you’ll earn points and unlock
        new levels while gaining real- world communication skills.`,
      marketingStrategyDetails: `Learning with Newedu is fun, and research shows that it works!
        With quick, bite-sized lessons, you’ll earn points and unlock
        new levels while gaining real- world communication skills.`,
      companyGraph: `${cosmexGraph}`,
    },
  ];
  return (
    <div className="investors_main">
      <h1> Startups Associated With Us</h1>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <h1 style={{ fontSize: "30px", marginLeft: "120px" }}>
            StartUp Details
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
                  Funding <span>: {openData.funding}</span>
                </p>
                <p>
                  TurnOver <span>: {openData.turnover}</span>
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
   {/* <div className={`{${styles.projectPageWrapper}}`}>
      <OwlCarousel items={1} className="owl-theme" margin={8} nav={false}>
        {owlCarouselData.map((item, index) => (
          <div key={index}>
            <div className={`${styles.itemWrapper}`}>
              <div className={`${styles.itemWrapperOne}`}>
                <div className={`${styles.itemWrapperOneLogo}`}>
                  <div className={`${styles.itemImagesLogo}`}>
                    {" "}
                    <img src={item.companyLogo} alt="NewEduLogo" />
                  </div>
                </div>
                <div className={`${styles.itemWrapperOneAboutUs}`}>
                  <h2>{item.companyName}</h2>
                  <p>
                    {item.companyDetailsOne}
                  </p>
                  <p>
                    {item.companyDetailsTwo}
                  </p>
                  <p>
                    {item.companyDetailsThree}
                  </p>
                </div>
              </div>
              <div className={`${styles.itemWrapperTwo}`}>
                <h2>Marketing Strategy</h2>
                <p>
                    {item.marketingStrategyDetails}
                </p>
              </div>
              <div className={`${styles.itemWrapperThree}`}>
                <h2>Our Previous Records</h2>
                <div className={`${styles.itemWrapperThreeImages}`}>
                  <div>
                    <img src={item.companyGraph} alt="flowChart" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
        </div>*/}
    
  
};

export default Startuppage;
