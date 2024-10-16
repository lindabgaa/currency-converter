import { useState } from "react";
import "./App.css";
import downArrowIcon from "./assets/down-arrow.svg";
import reverseIcon from "./assets/reverse-icon.svg";

function App() {
  const [amount, setAmount] = useState(50);

  // ---- Function to handle the amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <main className="main-container">
      <h1>Currency Converter</h1>
      <p className="description">
        Get real-time exchange rates and convert your currencies with ease.
      </p>

      <div className="converter-container">
        <div className="converter-input-wrapper">
          {/* ---- Amount Input */}
          <div className="flex-col">
            <label htmlFor="amount-input">Amount</label>
            <input
              type="number"
              id="amount-input"
              value={amount}
              autoComplete="off"
              onChange={handleAmountChange}
            />
            <p className="amount-error-message"></p>
          </div>

          {/* ---- From Currency Input */}
          <div className="flex-col">
            <label htmlFor="from-input">From</label>
            <input type="text" id="from-input" autoComplete="off" readOnly />
            <img src={downArrowIcon} className="down-arrow-icon" />
          </div>

          {/* ---- Reverse Button */}
          <button type="button" className="swap-button">
            <img
              src={reverseIcon}
              className="swap-icon"
              alt="Swap Currencies"
            />
          </button>

          {/* ---- To Currency Input */}
          <div className="flex-col">
            <label htmlFor="to-input">To</label>
            <input type="text" id="to-input" autoComplete="off" readOnly />
            <img src={downArrowIcon} className="down-arrow-icon" />
          </div>
        </div>

        {/* ---- Converter Output */}
        <div className="converter-output-wrapper">
          <p>
            <span className="current-amount"></span>
            <span className="current-currency"></span>
          </p>
          <p>
            <span className="converted-amount"></span>
            <span className="converted-currency"></span>
          </p>
        </div>

        {/* ---- Convert Button */}
        <button type="button" className="convert-button">
          Convert
        </button>
      </div>
    </main>
  );
}

export default App;
