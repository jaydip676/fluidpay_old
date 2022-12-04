import React from "react";
import "../styles/home.scss";
import orgs from "../DynamicComponentsData";
import { useNavigate } from "react-router-dom";

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
        <div className="steps">
          <h2>Test Instructions</h2>
          div
        </div>
        <div className="footer">
          <hr />
          <h2>Hacked at ETHIndia</h2>
        </div>
      </div>
    </>
  );
}

export default Home;
