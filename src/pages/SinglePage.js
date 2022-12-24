import React from "react";
import "../styles/single.scss";
import { ethers } from "ethers";
import CONTRACT_ADDRESS from "../config";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import { Framework } from "@superfluid-finance/sdk-core";

function SinglePage({ title, desc, OrgsAddress, charges, image }) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const startStream = async () => {
    console.log("starting the stream...");
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });

    try {
      const ethx = await sf.loadSuperToken("ETHx");
      console.log(ethx.address);
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: "1000",
        sender: address,
        receiver: "0xbFc4A28D8F1003Bec33f4Fdb7024ad6ad1605AA8",
        superToken: ethx.address,
        // userData?: string
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);
      console.log(result);

      console.log(
        `Congrats - you've just created a money stream!
        View Your Stream At: https://app.superfluid.finance/dashboard/0xbFc4A28D8F1003Bec33f4Fdb7024ad6ad1605AA8
        Network: Goerli
        Super Token: DAIx
        Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
        
        FlowRate: 100
        `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
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
