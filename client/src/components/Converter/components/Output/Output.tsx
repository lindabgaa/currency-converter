import { forwardRef, useEffect, useState } from "react";
import { fetchConversionResultFromServer } from "../../../../api";
import { formatNumber } from "../../../../utils";

import "./Output.css";

interface OutputProps {
  ref: React.RefObject<HTMLDivElement>;
  hasConverted: boolean;
  amount: number;
  fromCurrencyCode: string;
  toCurrencyCode: string;
  fromCurrencyName: string;
  toCurrencyName: string;
}

const Output = forwardRef<HTMLDivElement, OutputProps>((props, ref) => {
  const { amount, hasConverted, fromCurrencyCode, toCurrencyCode, fromCurrencyName, toCurrencyName } = props;
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    if (!hasConverted) {
      return;
    }

    const loadConversionResults = async () => {
      try {
        const data = await fetchConversionResultFromServer(fromCurrencyCode, toCurrencyCode, amount);
        const { conversion_rate: rate, conversion_result: result } = data;

        setConversionRate(rate);
        setConvertedAmount(result);
      } catch (error) {
        console.error("Error loading conversion results:", error instanceof Error ? error.message : "Unknown error");
      }
    };

    loadConversionResults();
  }, [amount, fromCurrencyCode, toCurrencyCode, hasConverted]);

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
