import React, { useState } from "react";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import fluidPay_api from "../artifacts/fluidpay.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

function FetchData() {
  const [arryData, setArrayData] = useState([]);
  const navigate = useNavigate();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: fluidPay_api,
    signerOrProvider: provider,
  });
  // const connectedContract = new ethers.Contract(
  //   CONTRACT_ADDRESS,
  //   fluidPay_api,
  //   provider
  // );
  let platformsAddresses_array = [];
  //function to fetch data
  const fetch = async () => {
    platformsAddresses_array = await connectedContract.getAllPlatformsAddress();
    console.log("platfroms addresses");
    console.log(platformsAddresses_array);

    let metadata = [];
    for (let i = 0; i < platformsAddresses_array.length; i++) {
      let metadata_tx = await connectedContract.getPlatformData(
        platformsAddresses_array[i]
      );
      metadata.push(metadata_tx);
      //   console.log(metadata_tx);
    }
    console.log("Platforms's metadata");
    console.log(metadata);
    setArrayData(metadata);
  };

  return (
    <div>
      {arryData.map((item, key) => {
        return (
          <div
            className="card"
            key={key}
            onClick={() => {
              navigate(`/organization/${item.address}`, {
                state: {
                  name: item.name,
                  image: item.image,
                  address: item.ph_address,
                  desc: item.description,
                  charges: item.charges,
                },
              });
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
                Charges - <span>{item.charges}</span> ETHx / sec
              </p>
            </div>
          </div>
        );
      })}
      <button onClick={() => fetch()}>Fetch Data</button>
    </div>
  );
}

export default FetchData;
