import { useParams } from "react-router-dom";
import fluidPay_api from "../artifacts/fluidPay.json";
import { CONTRACT_ADDRESS } from "../config";
import { useContract, useProvider, useSigner } from "wagmi";
import React, { useEffect, useRef, useState } from "react";

function StreamEnd() {
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
      // metadata.push(metadata_tx);

      //   metadata.push({
      //     address: metadata_tx[0],
      //     name: metadata_tx[1],
      //     image: metadata_tx[2],
      //     description: metadata_tx[3],
      //     ph_address: metadata_tx[4],
      //     charges: parseInt(metadata_tx[5]),
      //   });
      console.log(parseInt(metadata_tx[5]));
      console.log(metadata_tx);

      //   console.log(metadata_tx);

      console.log("Platforms's metadata");
      //   console.log(metadata);
    };
    fetch();
    return () => {
      dataFetchedRef.current = true;
    };
  }, []);

  return <div>Stream ending...</div>;
}

export default StreamEnd;
