import React, { useEffect } from "react";
import "./home.css";
import styles from "./homepage.module.css";
import sharkUpLogo from "../../data/SharkUpLogoTag.png";
import $ from "jquery";
const Homepage = () => {
  
useEffect(()=>{
 $(".left")
   .on("mouseenter", function () {
     $(".containerrr").addClass("left-is-hovered");
   })
   .on("mouseleave", function () {
     $(".containerrr").removeClass("left-is-hovered");
   });

 $(".right")
   .on("mouseenter", function () {
     $(".containerrr").addClass("right-is-hovered");
   })
   .on("mouseleave", function () {
     $(".containerrr").removeClass("right-is-hovered");
   });
},[]);
 
 
  return (
    <div>
      <div className="land">
        <div className="containerrr">
          <div className="one-half left">
            <h1>Investor</h1>
            <a href="/ilogin" className="cta">
              Login
            </a>
          </div>
          <div className="one-half right">
            <h1>Startup</h1>
            <a href="/login" className="cta">
              Login
            </a>
          </div>
        </div>
      </div>
      <div className="homepageWrapper">
        <div className={`${styles.homepageWrapperOne}`}>
          <div className={`${styles.homepageImage}`}>
            <div className={`${styles.imageWrapper}`}>
              <img
                className={`${styles.cover}`}
                src={sharkUpLogo}
                alt="sharkUp Logo"
              />
            </div>
          </div>
          <div className={`${styles.homepageDetails}`}>
            <p>
              Nowadays, it seems like we’re experiencing a startup boom, where
              everyone with a bright idea, a good team, and hard work can become
              the next Steve Jobs. However, in today’s marketing-driven world,
              having a good promotional strategy for your startup is as
              essential as having a good idea for the same . For that a startup
              requires some funding. We aim to bridge this gap and let the Big
              Companies directly invest in the startup of their choice.
            </p>
            <p>
              We at Shark Up aim to provide a platform to startups to raise
              external funding or capital in order to expand their businesses
              into new markets or locations. It also allows them to invest in
              research & development (R&D) or to fend off the competition. This
              in turn helps generate more employment
            </p>
          </div>
        </div>
        <div className="homepageWrapperTwo"></div>
      </div>
    </div>
  );
};

export default Homepage;
