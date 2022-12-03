import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import orgs from "./DynamicComponentsData";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import Vitm from "./pages/Vitm";
import Lotd from "./pages/Lotd";
import Lbg from "./pages/Lgb";
import Wap from "./pages/Wap";

function App() {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
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
            <h1 className="logo-h1">FLUIDPAY</h1>
          </div>
          <HashRouter hashType="slash">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route
                path="/visvesvaraya-industrial-and-technological-museum"
                element={<Vitm />}
              />
              <Route path="/lord-of-the-drinks" element={<Lotd />} />
              <Route path="/lalbagh-botanical-garden" element={<Lbg />} />
              <Route path="/wonderla-amusement-park" element={<Wap />} />

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
