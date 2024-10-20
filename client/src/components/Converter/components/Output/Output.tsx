import { forwardRef, useEffect, useState } from "react";

import { formatNumber } from "../../../../utils";

import { getConversionResult } from "../../../../api";

import "./Output.css";

interface OutputProps {
  ref: React.RefObject<HTMLDivElement>;
  amount: number;
  fromCurrencyCode: string;
  toCurrencyCode: string;
  fromCurrencyLabel: string;
  toCurrencyLabel: string;
}

const Output = forwardRef<HTMLDivElement, OutputProps>((props, ref) => {
  const { amount, fromCurrencyCode, toCurrencyCode, fromCurrencyLabel, toCurrencyLabel } = props;

  // ---- State to handle the conversion rate
  const [conversionRate, setConversionRate] = useState<number>(0);

  // ---- State to handle the conversion result
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  // ---- useEffect to fetch conversion result from the API when the component mounts and when the amount, fromCurrencyCode, or toCurrencyCode changes
  useEffect(() => {
    const getOutputData = async () => {
      try {
        const rate = await getConversionResult(fromCurrencyCode, toCurrencyCode, 1);
        if (rate) {
          setConversionRate(rate);
        }

        if (amount <= 0) {
          setConvertedAmount(0);
          return;
        }

        const convertedAmount = await getConversionResult(fromCurrencyCode, toCurrencyCode, amount);
        if (convertedAmount) {
          setConvertedAmount(convertedAmount);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error getting output data (conversion rate, converted amount):", error.message);
        } else {
          console.error("Error getting output data (conversion rate, converted amount): Unknown error");
        }
      }
    };

    getOutputData();
  }, [amount, fromCurrencyCode, toCurrencyCode]);

  return (
    <div ref={ref} className="converter-output-wrapper hidden">
      <p className="amount-display">
        {formatNumber(amount)} {fromCurrencyLabel.substring(5)} =
      </p>
      <p className="converted-amount-display">
        {convertedAmount > 0 ? formatNumber(convertedAmount, 3) : "0,00"} {toCurrencyLabel.substring(5)}
      </p>
      <p className="conversion-rate-display">{`1 ${fromCurrencyCode} = ${formatNumber(
        conversionRate,
        3
      )} ${toCurrencyCode}`}</p>
      <p className="conversion-rate-display">{`1 ${toCurrencyCode} = ${formatNumber(
        1 / conversionRate,
        3
      )} ${fromCurrencyCode}`}</p>
    </div>
  );
});

export default Output;
