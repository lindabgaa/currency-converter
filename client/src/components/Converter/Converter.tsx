import { useRef, useState } from "react";

import AmountInput from "./components/AmountInput/AmountInput.tsx";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput.tsx";
import Output from "./components/Output/Output.tsx";

import reverseIcon from "../../assets/reverse-icon.svg";

import "./Converter.css";

const Converter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null); // ---- Ref to handle the converter container expansion
  const outputRef = useRef<HTMLDivElement | null>(null); // ---- Ref to handle the output wrapper display

  // ---- State to handle the amount to convert
  const [amount, setAmount] = useState<number>(7);

  // ---- State to handle the code (e.g. USD) of the selected currency
  const [fromCurrencyCode, setFromCurrencyCode] = useState<string>("USD");
  const [toCurrencyCode, setToCurrencyCode] = useState<string>("EUR");

  // ---- State to handle the label (e.g. USD - United States Dollar) of the selected currency
  const [fromCurrencyLabel, setFromCurrencyLabel] = useState<string>("USD - United States Dollar");
  const [toCurrencyLabel, setToCurrencyLabel] = useState<string>("EUR - Euro");

  // ---- State to handle if the conversion has been done
  const [hasConverted, setHasConverted] = useState<boolean>(false);

  // ---- Function to handle the currency swap when the user clicks the swap button
  const handleCurrencySwap = () => {
    // ---- Swap the currencies code
    setFromCurrencyCode(toCurrencyCode);
    setToCurrencyCode(fromCurrencyCode);

    // ---- Swap the currencies label
    setFromCurrencyLabel(toCurrencyLabel);
    setToCurrencyLabel(fromCurrencyLabel);
  };

  // ---- Function to handle the style changes when the user clicks the convert button
  const handleConvertButtonClick = () => {
    function handleExpand() {
      if (containerRef.current) {
        containerRef.current.classList.add("expand");
      }
    }

    function handleShowOutput() {
      if (outputRef.current) {
        outputRef.current.classList.remove("hidden");
      }
    }

    setHasConverted(true);
    handleExpand();
    setTimeout(handleShowOutput, 250);
  };

  return (
    <div ref={containerRef} className="converter-container">
      <div className="converter-input-wrapper">
        {/* ---- Amount Input */}
        <AmountInput setAmount={setAmount} />

        {/* ---- Currency From Input */}
        <CurrencyInput
          label="From"
          id="currency-from"
          setCurrencyCode={setFromCurrencyCode}
          currencyLabel={fromCurrencyLabel}
          setCurrencyLabel={setFromCurrencyLabel}
        />

        {/* ---- Reverse Button */}
        <button type="button" className="swap-button" onClick={handleCurrencySwap}>
          <img src={reverseIcon} className="swap-icon" alt="Swap Currencies" />
        </button>

        {/* ---- Currency To Input */}
        <CurrencyInput
          label="To"
          id="currency-to"
          setCurrencyCode={setToCurrencyCode}
          currencyLabel={toCurrencyLabel}
          setCurrencyLabel={setToCurrencyLabel}
        />
      </div>

      {/* ---- Conversion Result */}
      <Output
        ref={outputRef}
        amount={amount}
        fromCurrencyCode={fromCurrencyCode}
        toCurrencyCode={toCurrencyCode}
        fromCurrencyLabel={fromCurrencyLabel}
        toCurrencyLabel={toCurrencyLabel}
      />

      {/* ---- Convert Button */}
      {!hasConverted && (
        <button type="button" className="convert-button" onClick={handleConvertButtonClick} disabled={amount === 0}>
          Convert
        </button>
      )}
    </div>
  );
};

export default Converter;
