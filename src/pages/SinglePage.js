import React, { useEffect, useRef, useState } from "react";
import "../styles/single.scss";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../config";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import { Framework } from "@superfluid-finance/sdk-core";
import fluidPay_api from "../artifacts/fluidPay.json";
import { useLocation, useParams } from "react-router-dom";

function SinglePage() {
  // const location = useLocation();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const dataFetchedRef = useRef(false);
  //   const platform_address = "0xcc920c851327AF767b4bf770e3b2C2ea50B90fde";
  const { id } = useParams();
  console.log(id);
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: fluidPay_api,
    signerOrProvider: provider,
  });

  const [data, setData] = useState([]);

  // console.log(location.state);

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    //function to fetch data
    const fetch = async () => {
      console.log("inside fetch");
      //   platformsAddresses_array =
      //     await connectedContract.getAllPlatformsAddress();
      //   console.log("platfroms addresses");
      //   console.log(platformsAddresses_array);

      let metadata_tx = await connectedContract.getPlatformData(id);

      console.log(metadata_tx);
      if (!data.length > 0)
        data.push({
          address: metadata_tx[0],
          name: metadata_tx[1],
          image: metadata_tx[2],
          description: metadata_tx[3],
          ph_address: metadata_tx[4],
          charges: parseInt(metadata_tx[5]),
        });
      setLoading(false);
      // setData(data);

      console.log(parseInt(metadata_tx[5]));
      console.log(data);

      //   console.log(metadata_tx);

      console.log("Platforms's metadata");
      //   console.log(metadata);
    };
    fetch();
    return () => {
      setData(data);
    };
  }, []);

  if (!loading)
    return (
      <div className="single-orgs-page">
        <hr />
        <div className="orgs-name">
          <h1>{data[0].name}</h1>
        </div>
        <hr />
        <img className="orgs-image" src={data[0].image} alt="imageofthatorgs" />
        <hr />
        <div className="orgs-details">
          <h4>Address</h4>
          <p className="orgs-address">{data[0].ph_address}</p>
          <h4>Description</h4>
          <p className="orgs-desc">{data[0].description}</p>
          <h4>
            Charges - <span className="orgs-charges">{data[0].charges}</span>
          </h4>
        </div>
        {/* <div className="orgs-qr-code">
        <img src="" alt="qr-code" />
      </div> */}
        <button className="paynow" onClick={() => startStream()}>
          Pay Now
        </button>
      </div>
    );
}

export default SinglePage;
