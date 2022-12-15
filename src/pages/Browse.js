import React from "react";
import "../styles/browse.scss";
import qr1 from "../assets/wap.png";

function Browse() {
  return (
    <>
      <div className="browse-main">
        <h2 className="browse-header">Platform Registered</h2>
        <div className="browse-platform-name">Platform Name</div>
        <div className="browse-platform-details">Platform Details</div>
        <div className="browse-qr-main">
          <div className="browse-qr-start">
            <h3 className="browse-qr-header">Start Stream</h3>
            <img className="browse-qr-img" src={qr1} />
          </div>
          <div className="browse-qr-end">
            <h3 className="browse-qr-header">End Stream</h3>
            <img className="browse-qr-img" src={qr1} />
          </div>
        </div>
        <button className="browse-btn">Download QR Code</button>
      </div>
    </>
  );
}

export default Browse;
