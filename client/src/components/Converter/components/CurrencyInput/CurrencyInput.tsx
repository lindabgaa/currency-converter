import { useEffect, useRef, useState } from "react";

import { fetchCurrenciesListFromServer } from "../../../../api.ts";

import arrowIcon from "../../../../assets/arrow-icon.svg";
import crossIcon from "../../../../assets/cross-icon.svg";

import "./CurrencyInput.css";

interface CurrencyInputProps {
  label: string;
  id: string;
  currencyCode: string;
  setCurrencyCode: React.Dispatch<React.SetStateAction<string>>;
  currencyName: string;
  setCurrencyName: React.Dispatch<React.SetStateAction<string>>;
}

interface CurrenciesList {
  code: string;
  name: string;
  flag: string;
}

const CurrencyInput = ({
  label,
  id,
  currencyCode,
  setCurrencyCode,
  currencyName,
  setCurrencyName,
}: CurrencyInputProps) => {
  const selectorWrapperRef = useRef<HTMLDivElement>(null); // ---- Ref of the currency-selector-wrapper div element
  const searchInputRef = useRef<HTMLInputElement>(null); // ---- Ref of the currency-input input element
  const dropdownRef = useRef<HTMLUListElement>(null); // ---- Ref of the currency-dropdown ul element

  // ---- State to handle the currencies list fetched from the API
  const [currencies, setCurrencies] = useState<CurrenciesList[]>([]);

  // ---- State to handle the display of the elements of the currency selector
  // true : the input field and the dropdown are visible
  // false : only the selected currency text (div) is visible
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);

  // ---- State to handle the input value
  const [inputValue, setInputValue] = useState<string>("");

  // ---- Function to handle the filtering of the currencies list based on the input value
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      currency.code.toLowerCase().includes(inputValue.toLowerCase())
  );

  // ---- Function to handle the currency selection (when an option is selected from the dropdown)
  const handleCurrencySelection = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (e.target instanceof HTMLLIElement) {
      const selectedCurrencyCode = e.target.dataset.code;
      const selectedCurrencyName = e.target.dataset.name;

      if (selectedCurrencyCode && selectedCurrencyName) {
        setCurrencyCode(selectedCurrencyCode);
        setCurrencyName(selectedCurrencyName);
      }
    }

    setIsSelectorOpen(false); // ---- Close the dropdown
  };

  // ---- useEffect to fetch currencies from the API when the component mounts
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchCurrenciesListFromServer();

        setCurrencies(data as CurrenciesList[]);
      } catch (error) {
        console.error("Error loading currencies list:", error instanceof Error ? error.message : "Unknown error");
      }
    };

    loadCurrencies();
  }, []);

  // ---- useEffect to handle the input focus and reset when the currency selector is opened/closed
  useEffect(() => {
    if (!isSelectorOpen) {
      setInputValue("");
    } else if (isSelectorOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSelectorOpen]);

  // ---- useEffect to handle clicks outside the currency selector (div)
  // if clicked outside : isSelectorOpen is set to false and the currency selector is closed
  useEffect(() => {
    const handleClickOutsideInput = (event: MouseEvent) => {
      if (selectorWrapperRef.current && !selectorWrapperRef.current.contains(event.target as Node)) {
        setIsSelectorOpen(false);
      }
    };

    // ---- Call the function on mount when mousedown event is detected
    document.addEventListener("mousedown", handleClickOutsideInput);

    // ---- Cleanup the event listener on unmount to prevent memory leaks
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, [selectorWrapperRef]);

  // ---- useEffect to handle the height of the dropdown based on the number of filtered currencies
  useEffect(() => {
    if (filteredCurrencies.length === 0 && dropdownRef.current) {
      dropdownRef.current.style.height = "4.27rem";
    } else if (filteredCurrencies.length <= 7 && dropdownRef.current) {
      dropdownRef.current.style.height = `${filteredCurrencies.length * 4.27}rem`;
    } else {
      dropdownRef.current?.style.removeProperty("height");
    }
  }, [filteredCurrencies]);

  return (
    <div className="currency-container">
      <span className="label">{label}</span>

      <div className="currency-selector-wrapper" ref={selectorWrapperRef}>
        {!isSelectorOpen ? (
          <div
            className="selected-currency-container"
            onClick={(e) => {
              e.stopPropagation();
              setIsSelectorOpen(true);
            }}
          >
            <p className="selected-currency-display">{`${currencyCode} - ${currencyName}`}</p>

            {/* ---- Open Dropdown Icon */}
            <img src={arrowIcon} className="open-dropdown-icon" />
          </div>
        ) : (
          <div className="search-currency-container">
            <input
              ref={searchInputRef}
              type="text"
              value={inputValue}
              id={id}
              className="search-currency-input"
              aria-label={`Search Currency ${label}`}
              placeholder="Type to search..."
              autoComplete="off"
              onChange={(e) => setInputValue(e.target.value)}
            />

            {/* ---- Close Dropdown Icon */}
            <img src={crossIcon} className="close-dropdown-icon" onClick={() => setIsSelectorOpen(false)} />

            {/* ---- Currency Dropdown */}
            <ul ref={dropdownRef} className="currency-dropdown-menu">
              {filteredCurrencies.length > 0 ? (
                filteredCurrencies.map((currency: CurrenciesList) => {
                  return (
                    <li
                      key={currency.code}
                      data-code={currency.code}
                      data-name={currency.name}
                      className="currency-dropdown-item"
                      onClick={handleCurrencySelection}
                    >
                      {`${currency.code} - ${currency.name}`}
                    </li>
                  );
                })
              ) : (
                <li className="currency-dropdown-item no-results" data-code="">
                  No results available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
