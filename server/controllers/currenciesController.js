const axios = require("axios");

const API_KEY = process.env.EXCHANGERATE_API_KEY;
const BASE_URL = process.env.EXCHANGERATE_API_BASE_URL;

const getCurrenciesList = async (req, res) => {
  const endPoint = "codes";
  const url = `${BASE_URL}${API_KEY}/${endPoint}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // If the external API returns an error, use its status code
    if (error.response && error.response.data) {
      const { result, "error-type": errorType } = error.response.data;

      if (result === "error") {
        return res.status(error.response.status || 400).json({
          error: {
            message: "Failed to retrieve currency codes from external API",
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

module.exports = { getCurrenciesList };
