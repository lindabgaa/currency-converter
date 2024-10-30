import { forwardRef, useEffect, useState } from "react";

import { formatNumber } from "../../../../utils";

import { getConversionResult } from "../../../../api";

import "./Output.css";

interface OutputProps {
  ref: React.RefObject<HTMLDivElement>;
  amount: number;
  fromCurrencyCode: string;
  toCurrencyCode: string;
  fromCurrencyName: string;
  toCurrencyName: string;
}

const Output = forwardRef<HTMLDivElement, OutputProps>((props, ref) => {
  const { amount, fromCurrencyCode, toCurrencyCode, fromCurrencyName, toCurrencyName } = props;

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
      <p className="amount-display">{`${formatNumber(amount, 2)} ${fromCurrencyName} = `}</p>
      <p className="converted-amount-display">
        {convertedAmount > 0 ? formatNumber(convertedAmount) : "0,00"} {toCurrencyName}
      </p>
      <p className="conversion-rate-display">{`1 ${fromCurrencyCode} = ${formatNumber(
        conversionRate
      )} ${toCurrencyCode}`}</p>
      <p className="conversion-rate-display">{`1 ${toCurrencyCode} = ${formatNumber(
        1 / conversionRate
      )} ${fromCurrencyCode}`}</p>
    </div>
  );
});

export default Output;
