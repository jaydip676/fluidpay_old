import React from "react";
import "../styles/transaction.scss";
import USDC from "../assets/usdc.svg";

const Transaction = () => {
  return (
    <>
      <div className="transcation-main">
        <h2 className="transaction-header">Total Amount Streamed</h2>
        <div className="transaction-top">
          <img className="transaction-img" src={USDC} alt="trasaction" />
          <h1 className="transaction-top-1">2244.90217</h1>
          <h2 className="transaction-top-2">USDCx</h2>
        </div>
        <h4 className="transaction-top-3">$2244.89551 USD</h4>
        <div className="transaction-mid">
          <div className="transaction-send-receive">
            <h3 className="transaction-send-receive-header">Sender</h3>
            <div>Account Address</div>
          </div>
          <div className="cloud-main">
            <div id="clouds">
              <div class="cloud x1"></div>
              <div class="cloud x2"></div>
              <div class="cloud x3"></div>
              <div class="cloud x4"></div>
              <div class="cloud x5"></div>
              <div class="cloud x6"></div>
              <div class="cloud x7"></div>
            </div>
          </div>
          <div className="transaction-send-receive">
            <h3 className="transaction-send-receive-header">Receiver</h3>
            <div>Account Address</div>
          </div>
        </div>
        <div className="transaction-mid-bottom">
          <h4 className="transaction-mid-bottom-1">1045.0219452</h4>
          <h4 className="transaction-mid-bottom-2">USDCx</h4>
          <h4 className="transaction-mid-bottom-3">Per Month</h4>
        </div>
        <div className="transaction-bottom">
          <div className="transaction-bottom-left">
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Start Date</h4>
              <h4 className="transaction-bottom-sub-main-2">
                5 May 2022 at 12:00 GMT
              </h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">End Date</h4>
              <h4 className="transaction-bottom-sub-main-2">Never</h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">
                Project Liquidation
              </h4>
              <h4 className="transaction-bottom-sub-main-2">14 Aug 2022</h4>
            </div>
          </div>
          <div className="transaction-bottom-right">
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Buffer</h4>
              <h4 className="transaction-bottom-sub-main-2">80.54992 USDCx</h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Network Name</h4>
              <h4 className="transaction-bottom-sub-main-2">Gnosis Chain</h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Transaction ID</h4>
              <h4 className="transaction-bottom-sub-main-2">Some Random ID</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
