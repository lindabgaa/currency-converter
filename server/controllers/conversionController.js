const axios = require("axios");

const API_KEY = process.env.EXCHANGERATE_API_KEY;
const BASE_URL = process.env.EXCHANGERATE_API_BASE_URL;

const getConversionResult = async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({
      error: {
        message: "Missing required parameters",
        detail: "Parameters 'from', 'to', and 'amount' are required.",
      },
    });
  }

  if (isNaN(amount) || Number(amount) < 0) {
    return res.status(400).json({
      error: {
        message: "Invalid amount",
        detail: "The 'amount' parameter must be a positive number.",
      },
    });
  }

  const endPoint = "pair";
  const url = `${BASE_URL}${API_KEY}/${endPoint}/${from}/${to}/${amount}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    // If the external API returns an error, use its status code
    if (error.response && error.response.data) {
      const { result, "error-type": errorType } = error.response.data;

      if (result === "error") {
        return res.status(error.response.status || 400).json({
          error: {
            message: "Failed to fetch data from external API",
            detail: errorType || "Unknown error",
          },
        });
      }
    }

    // For other types of errors (such as network issues), return a generic error message
    return res.status(500).json({
      error: { message: "Internal server error", detail: error.message },
    });
  }
};

module.exports = { getConversionResult };
