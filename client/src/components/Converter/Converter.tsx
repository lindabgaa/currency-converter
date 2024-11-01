import { useRef, useState } from "react";
import reverseIcon from "../../assets/reverse-icon.svg";
import AmountInput from "./components/AmountInput/AmountInput.tsx";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput.tsx";
import Output from "./components/Output/Output.tsx";
import "./Converter.css";

const Converter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null); // ---- Ref to handle the converter container expansion
  const outputRef = useRef<HTMLDivElement | null>(null); // ---- Ref to handle the output wrapper display

  // ---- State to handle the amount to convert
  const [amount, setAmount] = useState<number>(7);

  // ---- State to handle the code (e.g. USD) of the selected currency
  const [fromCurrencyCode, setFromCurrencyCode] = useState<string>("USD");
  const [toCurrencyCode, setToCurrencyCode] = useState<string>("EUR");

  // ---- State to handle the name (e.g. United States Dollar) of the selected currency
  const [fromCurrencyName, setFromCurrencyName] = useState<string>("United States Dollar");
  const [toCurrencyName, setToCurrencyName] = useState<string>("Euro");

  // ---- State to handle if the conversion has been done
  const [hasConverted, setHasConverted] = useState<boolean>(false);

  // ---- Function to handle the currency swap when the user clicks the swap button
  const handleCurrencySwap = () => {
    // ---- Swap the currencies code
    setFromCurrencyCode(toCurrencyCode);
    setToCurrencyCode(fromCurrencyCode);

    // ---- Swap the currencies label
    setFromCurrencyName(toCurrencyName);
    setToCurrencyName(fromCurrencyName);
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
          currencyCode={fromCurrencyCode}
          setCurrencyCode={setFromCurrencyCode}
          currencyName={fromCurrencyName}
          setCurrencyName={setFromCurrencyName}
          aria-label="Select the currency to convert from"
        />

        {/* ---- Reverse Button */}
        <button type="button" className="swap-button" aria-label="Swap the currencies" onClick={handleCurrencySwap}>
          <img src={reverseIcon} className="swap-icon" alt="" />
        </button>

        {/* ---- Currency To Input */}
        <CurrencyInput
          label="To"
          id="currency-to"
          currencyCode={toCurrencyCode}
          setCurrencyCode={setToCurrencyCode}
          currencyName={toCurrencyName}
          setCurrencyName={setToCurrencyName}
          aria-label="Select the currency to convert to"
        />
      </div>

      {/* ---- Conversion Result */}
      <Output
        ref={outputRef}
        hasConverted={hasConverted}
        amount={amount}
        fromCurrencyCode={fromCurrencyCode}
        toCurrencyCode={toCurrencyCode}
        fromCurrencyName={fromCurrencyName}
        toCurrencyName={toCurrencyName}
        aria-live="polite"
      />

      {/* ---- Convert Button */}
      {!hasConverted && (
        <button
          type="button"
          className="convert-button"
          onClick={handleConvertButtonClick}
          disabled={amount === 0}
          aria-disabled={amount === 0}
        >
          Convert
        </button>
      )}
    </div>
  );
};

export default Converter;
