import { useState } from "react";

import { formatNumber } from "../../../../utils";

import "./AmountInput.css";

interface AmountInputProps {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

const AmountInput = ({ setAmount }: AmountInputProps) => {
  const [inputValue, setInputValue] = useState<string>(formatNumber(7));

  const [amountError, setAmountError] = useState<string>("");

  // ---- Function to handle the amount input change
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const numericValue: number = parseFloat(value);

    if (isNaN(numericValue)) {
      setAmount(0);
      setAmountError("Please enter a valid amount");
    } else {
      if (numericValue > 0) {
        setAmount(numericValue);
        setAmountError("");
      } else {
        setAmount(0);
        setAmountError("Please enter an amount greater than 0");
      }
    }

    setInputValue(value);
  };

  // ---- Function to handle the amount input loss of focus
  const handleAmountInputBlur = () => {
    const inputNumber = parseFloat(inputValue);
    if (!isNaN(inputNumber)) {
      setInputValue(formatNumber(inputNumber));
    }
  };

  return (
    <div className="amount-container">
      <label htmlFor="amount-input">Amount</label>

      <input
        type="text"
        id="amount-input"
        value={inputValue}
        autoComplete="off"
        onChange={handleAmountInputChange}
        onBlur={handleAmountInputBlur}
      />

      {amountError && <p className="amount-error-message">{amountError}</p>}
    </div>
  );
};

export default AmountInput;
