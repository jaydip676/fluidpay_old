import "./App.css";
import { Route, Routes, HashRouter } from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Home from "./pages/Home";

import Vitm from "./pages/Vitm";
import Lotd from "./pages/Lotd";
import Lgb from "./pages/Lgb";
import Wap from "./pages/Wap";
import logo from "../src/assets/fluid-pay-logo.png";
import LgbEnd from "./pages/LgbEnd";
import VitmEnd from "./pages/VitmEnd";
import LotdEnd from "./pages/LotdEnd";
import WapEnd from "./pages/WapEnd";

function App() {
  const { chains, provider } = configureChains(
    [chain.goerli, chain.polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "projectone",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <div className="logo-div">
            {/* <h1 className="logo-h1">FLUIDPAY</h1> */}
            <img className="logo" src={logo} alt="logo" />
          </div>
          <hr />
          <HashRouter hashType="slash">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route
                path="/visvesvaraya-industrial-and-technological-museum"
                element={<Vitm />}
              />
              <Route
                path="/visvesvaraya-industrial-and-technological-museum/stream-end"
                element={<VitmEnd />}
              />
              <Route path="/lord-of-the-drinks" element={<Lotd />} />
              <Route
                path="/lord-of-the-drinks/stream-end"
                element={<LotdEnd />}
              />

              <Route path="/lalbagh-botanical-garden" element={<Lgb />} />

              <Route
                path="/lalbagh-botanical-garden/stream-end"
                element={<LgbEnd />}
              />
              <Route path="/wonderla-amusement-park" element={<Wap />} />

              <Route
                path="/wonderla-amusement-park/stream-end"
                element={<WapEnd />}
              />

              {/* {orgs.map((item, key) => {
                return (
                  <Route
                    exact
                    path={item.route}
                    element={
                      <SinglePage
                        title={item.name}
                        desc={item.description}
                        OrgsAddress={item.address}
                        charges={item.charges}
                        image={item.image}
                      />
                    }
                  />
                );
              })} */}
            </Routes>
          </HashRouter>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
export default App;
