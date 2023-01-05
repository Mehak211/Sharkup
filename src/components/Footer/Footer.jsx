import React from "react";
import styles from "./footer.module.css";
import sharkUpLogo from "../../data/SharkUpLogoTwo.png";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      <div className={`${styles.footerWrapper}`}>
        <div className={`${styles.footerWrapperOne}`}>
          <div className={`${styles.imageWrapper}`}>
            <img
              className={`${styles.cover}`}
              src={sharkUpLogo}
              alt="sharkUp Logo"
            />
          </div>
          <div className={`${styles.companyContact}`}>
            <h5>Address:</h5>
            <p> B21, SECTOR-63,NOIDA PINCODE-XXXXX</p>
          </div>
          <div className={`${styles.companyContact}`}>
            <h5>Contact Us:</h5>
            <p> 9988XXXXXX</p>
          </div>
          <div className={`${styles.companyContact}`}>
            <h5>Email:</h5>
            <p> xxyyzz@sharkup.com</p>
          </div>
        </div>
        <div className={`${styles.footerWrapperTwo}`}>
          <ul>
            <li>Home</li>
            <li>Projects</li>
            <li>Objective</li>
            <li>Investors</li>
            <li>Start Ups</li>
          </ul>
        </div>
        <div className={`${styles.footerWrapperThree}`}>
          <button>
            <span>
              <BsFacebook />
            </span>
            <span>Facebook</span>
          </button>
          <button>
            <span>
              <BsInstagram />
            </span>
            <span>Instagram</span>
          </button>
          <button>
            <span>
              <BsTwitter />
            </span>
            <span>Twitter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
