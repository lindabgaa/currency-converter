import axios, { AxiosError } from "axios";

const domain =
  import.meta.env.VITE_ENV === "production" && import.meta.env.VITE_DEPLOYED_SERVER_URL
    ? import.meta.env.VITE_DEPLOYED_SERVER_URL
    : import.meta.env.VITE_ENV === "development" && import.meta.env.VITE_LOCAL_SERVER_URL
    ? import.meta.env.VITE_LOCAL_SERVER_URL
    : "";

// ---- Function to get currencies list from the Server
export const fetchCurrenciesFromServer = async () => {
  try {
    const url = `${domain}/api/currencies/list`;
    const response = await axios.get(url);
    const data = response.data.supported_codes;

    if (!data) {
      throw new Error("No data received from the server");
    }

    // Convert the array of arrays to an array of objects
    return data.map(([key, value]: [string, string]) => ({ code: key, name: value }));
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data?.error.message}: ${error.response?.data?.error.detail}`);
    } else {
      throw new Error("Unknown error");
    }
  }
};

// ---- Function to get conversion result from the Server
export const fetchConversionResultFromServer = async (from: string, to: string, amount: number) => {
  try {
    const response = await axios.get(`${domain}/api/conversion/result`, {
      params: {
        from,
        to,
        amount,
      },
    });

    const data = response.data;

    if (!data) {
      throw new Error("No data received from the server");
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data?.error.message}: ${error.response?.data?.error.detail}`);
    } else {
      throw new Error("Unknown error");
    }
  }
};
