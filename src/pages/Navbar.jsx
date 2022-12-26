import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import logo from "../assets/logo.png";
import "../styles/navbar.scss";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function Navbar() {
  let navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [connected, setConnection] = useState(false);

  const connectWallet = () => {
    connect();
  };

  useEffect(() => {
    if (isConnected) {
      setConnection(true);
    } else {
      setConnection(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      setConnection(true);
    } else {
      setConnection(false);
    }
  }, []);
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <img className="nav-logo" src={logo} />
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <div className="navtextstyle">Home</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              <div className="navtextstyle">Register</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className="nav-link">
              <div className="navtextstyle">Explore</div>
            </Link>
          </li>

          {connected ? (
            <>
              <li className="nav-item">
                <Link to="/browse" className="nav-link">
                  <div className="navtextstyle">Browse</div>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/transaction" className="nav-link">
                  <div className="navtextstyle">Transaction</div>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-disconnect"
                  onClick={() => {
                    disconnect();
                  }}
                >
                  Disconnect
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button
                className="nav-button"
                onClick={() => {
                  connectWallet();
                }}
              >
                Connect
              </button>
            </li>
          )}
        </ul>
        <div
          className="nav-ham-menu"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <MenuIcon />
        </div>
        {menu ? (
          <div className="mobile-menu">
            <ul>
              <li>
                <span
                  onClick={() => {
                    navigate("/");
                    setMenu(!menu);
                  }}
                >
                  Home
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    navigate("/register");
                    setMenu(!menu);
                  }}
                >
                  Register
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    navigate("/explore");
                    setMenu(!menu);
                  }}
                >
                  Explore
                </span>
              </li>

              {connected ? (
                <>
                  <li>
                    <span
                      onClick={() => {
                        navigate("/browse");
                        setMenu(!menu);
                      }}
                    >
                      Browse
                    </span>
                  </li>

                  <li>
                    <span
                      onClick={() => {
                        navigate("/transaction");
                        setMenu(!menu);
                      }}
                    >
                      Transaction
                    </span>
                  </li>

                  <li>
                    <button
                      className="nav-button"
                      onClick={() => {
                        disconnect();
                      }}
                    >
                      Disconnect
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    className="nav-button"
                    onClick={() => {
                      connectWallet();
                    }}
                  >
                    Connect
                  </button>
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </nav>
    </>
  );
}

export default Navbar;
