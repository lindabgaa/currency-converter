import { forwardRef, useEffect, useState } from "react";
import { fetchConversionResultFromAPI } from "../../../../api";
import { formatNumber } from "../../../../utils";

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
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    const loadConversionResults = async () => {
      try {
        const rate = await fetchConversionResultFromAPI(fromCurrencyCode, toCurrencyCode, 1);
        if (rate) {
          setConversionRate(rate);
        }

        if (amount <= 0) {
          setConvertedAmount(0);
          return;
        }

        const convertedAmount = await fetchConversionResultFromAPI(fromCurrencyCode, toCurrencyCode, amount);
        if (convertedAmount) {
          setConvertedAmount(convertedAmount);
        }
      } catch (error) {
        console.error("Error loading conversion results:", error instanceof Error ? error.message : "Unknown error");
      }
    };

    loadConversionResults();
  }, [amount, fromCurrencyCode, toCurrencyCode]);

  return (
    <div ref={ref} className="converter-output-wrapper hidden">
      <p className="amount-display">{`${formatNumber(amount)} ${fromCurrencyName} = `}</p>
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
