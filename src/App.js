import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "./pages/Navbar";
import Landing, { metadata } from "./pages/Landing";
import Explore from "./pages/Explore";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import SinglePage from "./pages/SinglePage";
import orgs from "./DynamicComponentsData";
import FetchData from "./pages/FetchData";
import StreamEnd from "./pages/StreamEnd";

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
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Landing />} />
              {/* <Route
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
              /> */}
              <Route path="/explore" element={<Explore />}></Route>
              <Route
                exact
                path="organization/:id"
                element={
                  <SinglePage
                  // title={item.name}
                  // desc={item.description}
                  // OrgsAddress={item.address}
                  // charges={item.charges}
                  // image={item.image}
                  />
                }
              />
              <Route
                exact
                path="organization/stream-end/:id"
                element={
                  <StreamEnd
                  // title={item.name}
                  // desc={item.description}
                  // OrgsAddress={item.address}
                  // charges={item.charges}
                  // image={item.image}
                  />
                }
              />
              <Route path="/browse" element={<Browse />} />
              <Route path="/register" element={<Register />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/fetch-data" element={<FetchData />} />
            </Routes>
          </BrowserRouter>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
export default App;
