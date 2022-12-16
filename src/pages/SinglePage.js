import React from "react";
import "../styles/single.scss";
import { ethers } from "ethers";
import quickPay_abi from "../artifacts/fluidpay.json";

function SinglePage({ title, desc, OrgsAddress, charges, image }) {
  const CONTRACT_ADDRESS = "0x25f4e7912eDbA1C47C63B6BA4Ac14Eb7dB876954";

  const startStream = async () => {
    console.log("getting");
    const platform = "0xbFc4A28D8F1003Bec33f4Fdb7024ad6ad1605AA8";
    const user = "0xcc4091815292B2D3BB3076022Dc72d432B6cAdEb";
    if (window.ethereum) {
      handleEthereum();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("inside id");
      console.log(quickPay_abi);

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        quickPay_abi,
        signer
      );
      console.log("wait...");
      let tx = await connectedContract.createStream(user, platform, {
        gasLimit: 500000,
      });
      console.log(tx);
    }
  };

  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log("Ethereum successfully detected!");
    } else {
      console.log("Please install MetaMask!");
    }
  }

  return (
    <div className="single-orgs-page">
      <hr />
      <div className="orgs-name">
        <h1>{title}</h1>
      </div>
      <hr />
      <img className="orgs-image" src={image} alt="imageofthatorgs" />
      <hr />
      <div className="orgs-details">
        <h4>Address</h4>
        <p className="orgs-address">{OrgsAddress}</p>
        <h4>Description</h4>
        <p className="orgs-desc">{desc}</p>
        <h4>
          Charges - <span className="orgs-charges">{charges}</span>
        </h4>
      </div>
      {/* <div className="orgs-qr-code">
        <img src="" alt="qr-code" />
      </div> */}
      <button className="paynow" onClick={startStream}>
        Pay Now
      </button>
    </div>
  );
}

export default SinglePage;
