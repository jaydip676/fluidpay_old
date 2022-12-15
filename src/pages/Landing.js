import React from "react";
import "../styles/landing.scss";
import HomeImg1 from "../assets/1.png";
import HomeImg2 from "../assets/2.1.png";
import Btn from "../assets/Asset2.svg";

function Landing() {
  return (
    <>
      <div className="home-main">
        <div className="home-main-top">
          <div>LOREM</div>
          <div>IPSUM DOLOR</div>
        </div>
        <img className="home-main-img1" alt="bank" src={HomeImg1} />
        <img className="home-main-img2" alt="cryptoimg" src={HomeImg2} />
        <div className="home-main-mid">
          <div className="home-main-mid1">Lorem</div>
          <div className="home-main-mid2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="home-mid-btn">
            <img src={Btn} className="home-main-mid-btn" />
            <div className="home-main-mid-btntxt">Button</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
