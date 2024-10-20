import axios, { AxiosError } from "axios";

// ---- Function to get currencies list from the API
export const getCurrenciesList = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/fetchCurrenciesList");
    const data = response.data.symbols;
    return Object.entries(data).map(([key, value]) => ({ code: key, name: value }));
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data?.error}: ${error.response?.data?.message}`);
    } else {
      throw new Error("Unknown error");
    }
  }
};

// ---- Function to get conversion result from the API
export const getConversionResult = async (from: string, to: string, amount: number) => {
  try {
    const response = await axios.get("http://localhost:8080/api/fetchConversionResult", {
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
      throw new Error(`${error.response?.data?.error}: ${error.response?.data?.message}`);
    } else {
      throw new Error("Unknown error");
    }
  }
};
