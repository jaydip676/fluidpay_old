import React from "react";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import fluidPay_api from "../artifacts/fluidPay.json";

function FetchData() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: fluidPay_api,
    signerOrProvider: signer,
  });
  let platformsAddresses_array = [];
  //function to fetch data
  const fetch = async () => {
    platformsAddresses_array = await connectedContract.getAllPlatformsAddress();
    console.log(platformsAddresses_array);

    for (let i = 0; i < platformsAddresses_array.length; i++) {
      let metadata = await connectedContract.getPlatformData(
        platformsAddresses_array[i]
      );
      console.log(metadata);
    }
  };
  return (
    <div>
      <button onClick={() => fetch()}>Fetch Data</button>
    </div>
  );
}

export default FetchData;
