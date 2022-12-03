import React from "react";
import "../styles/single.scss";
import background from "../assets/hero.webp";
import ethlogo from "../assets/eth-logo.webp";
import orgs from "../DynamicComponentsData";

function Lotd() {
  return (
    <div className="single-orgs-page">
      <hr />
      <div className="orgs-name">
        <h1>{orgs[1].name}</h1>
      </div>
      <hr />
      <img className="orgs-image" src={orgs[1].image} alt="imageofthatorgs" />
      <hr />
      <div className="orgs-details">
        <h4>Address</h4>
        <p className="orgs-address">{orgs[1].address}</p>
        <h4>Description</h4>
        <p className="orgs-desc">{orgs[1].description}</p>
        <h4>
          Charges - <span className="orgs-charges">{orgs[1].charges}</span>
        </h4>
      </div>
      {/* <div className="orgs-qr-code">
        <img src="" alt="qr-code" />
      </div> */}
      <div className="orgs-last-section">
        <img className="background-image" src={background} alt="orgs_image" />
        <img className="ethlogo-image" src={ethlogo} alt="eth_logo" />
      </div>
    </div>
  );
}

export default Lotd;
