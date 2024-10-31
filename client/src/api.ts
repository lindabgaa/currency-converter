import axios, { AxiosError } from "axios";

// ---- Function to get currencies list from the API
export const fetchCurrenciesFromAPI = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/currencies/list");
    const data = response.data.symbols;

    // ---- Convert the object to an array of objects
    return Object.entries(data).map(([key, value]) => ({ code: key, name: value }));
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data?.error.message}: ${error.response?.data?.error.detail}`);
    } else {
      throw new Error("Unknown error");
    }
  }
};

// ---- Function to get conversion result from the API
export const fetchConversionResultFromAPI = async (from: string, to: string, amount: number) => {
  try {
    const response = await axios.get("http://localhost:8080/api/conversion/result", {
      params: {
        from,
        to,
        amount,
      },
    });
    const data = response.data.result;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data?.error.message}: ${error.response?.data?.error.detail}`);
    } else {
      throw new Error("Unknown error");
    }
  }
};
