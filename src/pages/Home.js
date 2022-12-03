import React from "react";
import "../styles/home.scss";
import orgs from "../DynamicComponentsData";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="heading">Available</h2>
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
                  Charges - <span>10</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
