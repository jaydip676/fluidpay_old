import React from "react";
import "../styles/home.scss";
import orgs from "../DynamicComponentsData";
import { useNavigate } from "react-router-dom";
import qr1 from "../assets/wap.png";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="heading">Available Platforms</h2>
      <div className="card-main">
        {orgs.map((item, key) => {
          return (
            <div
              className="card"
              key={key}
              onClick={() => {
                navigate(`${item.route}`);
              }}
            >
              <div className="card-logo">
                <img
                  src={`${item.image}`}
                  alt="oraganization-logo"
                  width="64px"
                  height="64px"
                />
                <div className="card-title-div">
                  <h3 className="card-title">{item.name}</h3>
                </div>
              </div>
              <div className="card-details">
                <div className="card-description">
                  <p>{item.description}</p>
                </div>
                <p className="card-charges">
                  Charges - <span>0.000001</span> DAIx / sec
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="steps">
        <h2>Test Instructions</h2>
        <hr />
        <div className="steps-one">
          <div className="left">
            <h3>Step - 1</h3>
          </div>
          <div className="right">
            <p>Stake ETH on Goerli. You will receive DAIx.</p>
            <button className="steps-one-btn">Stake</button>
          </div>
        </div>
        <hr />
        <div className="steps-two">
          <div className="left">
            <h3>Step - 2</h3>
          </div>
          <div className="right">
            <p>
              Consider you are entering a premises which charges based on time
              of use. Scan this QR to start stream.
            </p>
            <img src={qr1} alt="QR code" />
          </div>
        </div>
        <hr />
        <div className="steps-three">
          <div className="left">
            <h3>Step - 3</h3>
          </div>
          <div className="right">
            <p>You have used the premises. End the stream.</p>
            <img src={qr1} alt="QR code" />
          </div>
        </div>
      </div>
      <div className="footer">
        <hr />
        <h2>Hacked at ETHIndia</h2>
      </div>
    </>
  );
}

export default Home;
