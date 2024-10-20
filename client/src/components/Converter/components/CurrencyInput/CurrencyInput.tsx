import { useEffect, useRef, useState } from "react";

import { getCurrenciesList } from "../../../../api.ts";

import arrowIcon from "../../../../assets/arrow-icon.svg";
import crossIcon from "../../../../assets/cross-icon.svg";

import "./CurrencyInput.css";

interface CurrencyInputProps {
  label: string;
  id: string;
  setCurrencyCode: React.Dispatch<React.SetStateAction<string>>;
  currencyLabel: string;
  setCurrencyLabel: React.Dispatch<React.SetStateAction<string>>;
}

interface CurrenciesList {
  code: string;
  name: string;
}

const CurrencyInput = ({ label, id, setCurrencyCode, currencyLabel, setCurrencyLabel }: CurrencyInputProps) => {
  const divRef = useRef<HTMLDivElement>(null); // ---- Ref of the currency-selector-wrapper div element
  const inputRef = useRef<HTMLInputElement>(null); // ---- Ref of the currency-input input element
  const dropdownRef = useRef<HTMLUListElement>(null); // ---- Ref of the currency-dropdown ul element

  // ---- State to handle the currencies list fetched from the API
  const [currencies, setCurrencies] = useState<{ code: string; name: string }[]>([]);

  // ---- State to handle the display of the elements of the currency elector
  // true : the input field and the dropdown are visible
  // false : only the selected currency text (div) is visible
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);

  // ---- State to handle the input value
  const [inputValue, setInputValue] = useState<string>("");

  // ---- State to handle the display of the no results message (option) in the dropdown after no matching options are found when searching
  const [noResults, setNoResults] = useState<boolean>(false);

  // ---- Function to populate the currencies dropdown based on API data
  const populateDropdown = (currenciesData: CurrenciesList[]) => {
    return currenciesData.map((currency: CurrenciesList) => {
      return (
        <li
          key={currency.code}
          data-code={currency.code}
          data-label={`${currency.code} - ${currency.name}`}
          className="currency-dropdown-item"
          onClick={handleCurrencySelection}
        >
          {`${currency.code} - ${currency.name} `}
        </li>
      );
    });
  };

  // ---- Function to handle the currency change (when an option is selected from the dropdown)
  const handleCurrencySelection = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (e.target instanceof HTMLLIElement) {
      const selectedCurrencyCode = e.target.dataset.code;
      const selectedCurrencyLabel = e.target.dataset.label;

      if (selectedCurrencyCode && selectedCurrencyLabel) {
        setCurrencyCode(selectedCurrencyCode);
        setCurrencyLabel(selectedCurrencyLabel);
      }
    }

    setIsSelectorOpen(false); // ---- Close the dropdown
  };

  // ---- Function to handle the click on the currency selector (div)
  const handleSelectorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsSelectorOpen(true);
  };

  // ---- Function to handle the input change (when the user types in the input)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // ---- Function to handle the click on the open dropdown icon (down-arrow-icon)
  const handleOpenIconClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsSelectorOpen(true);
  };

  // ---- Function to handle the click on the close dropdown icon (cross-icon)
  const handleCloseIconClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsSelectorOpen(false);
  };

  // ---- useEffect to fetch currencies from the API when the component mounts
  useEffect(() => {
    if (currencies.length === 0) {
      try {
        getCurrenciesList().then((data) => {
          if (data) {
            setCurrencies(data as { code: string; name: string }[]);
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error getting currencies list:", error.message);
        } else {
          console.error("Error getting currencies list: Unknown error");
        }
      }
    }
  }, [currencies]);

  // ---- useEffect to handle the input focus and reset when the dropdown is opened/closed
  useEffect(() => {
    // Focus the input when the dropdown is opened
    if (isSelectorOpen && inputRef.current) {
      inputRef.current.focus();
      return;
    }

    // Reset the input value when the dropdown is closed
    if (!isSelectorOpen) {
      setInputValue("");
      return;
    }
  }, [isSelectorOpen]);

  // ---- useEffect to handle clicks outside the div (currency-selector-wrapper) : if clicked outside, isSelectorOpen is set to false
  useEffect(() => {
    const handleClickOutsideInput = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsSelectorOpen(false);
      }
    };

    // ---- Call the function on mount when mousedown event is detected
    document.addEventListener("mousedown", handleClickOutsideInput);

    // ---- Cleanup the event listener on unmount to prevent memory leaks
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, [divRef]);

  // ---- useEffect to handle the search functionality when the input value changes (user types in the input)
  useEffect(() => {
    const handleSearch = () => {
      const searchValue = inputValue.toLowerCase();

      // Get all the options from the dropdown
      const optionsArray: HTMLLIElement[] = Array.from(dropdownRef.current?.children || []) as HTMLLIElement[];

      // ---- Filter the options based on the search value
      const matchingOptions = optionsArray.filter(
        (option) => option.textContent?.toLowerCase().includes(searchValue) || false
      );

      // ---- Set the no results state to true if there is no matching option
      setNoResults(matchingOptions.length === 0);

      // ---- Show/hide the options based on if the option is in the matchingOptions array or not
      optionsArray.forEach((option) => {
        if (option.dataset.code) {
          option.style.display = matchingOptions.includes(option) ? "block" : "none";
        }
      });
    };

    handleSearch();
  }, [inputValue]);

  return (
    <div className="currency-container">
      <label htmlFor={id}>{label}</label>

      {/* ---- Currency Selector*/}
      <div ref={divRef} tabIndex={0} className="currency-selector-wrapper" onClick={handleSelectorClick}>
        {!isSelectorOpen ? (
          <>
            {/* ---- Selected Currency Display */}
            <div className="selected-currency-container">
              <p>{currencyLabel}</p>

              {/* ---- Open Dropdown Icon */}
              <img src={arrowIcon} className="open-dropdown-icon" onClick={handleOpenIconClick} />
            </div>
          </>
        ) : (
          <>
            {/* ---- Search Currency Search */}
            <div className="currency-search-container">
              {/* ---- Search Currency Input */}
              <input
                ref={inputRef}
                type="text"
                id={id}
                value={inputValue}
                className="search-currency-input"
                placeholder="Type to search..."
                autoComplete="off"
                onChange={handleInputChange}
              />

              {/* ---- Close Dropdown Icon */}
              <img src={crossIcon} className="close-dropdown-icon" onClick={handleCloseIconClick} />

              {/* ---- Currency Dropdown */}
              <ul ref={dropdownRef} className="currency-dropdown-menu">
                {populateDropdown(currencies)}

                {noResults && (
                  <li className="currency-dropdown-item no-results-item" data-code="">
                    No results available
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
