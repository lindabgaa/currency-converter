const axios = require("axios");

const API_KEY = process.env.EXCHANGERATE_API_KEY;
const BASE_URL = process.env.EXCHANGERATE_API_BASE_URL;

const getCurrenciesList = async (req, res) => {
  const endPoint = "symbols";
  const params = `?access_key=${API_KEY}`;

  const url = BASE_URL + endPoint + params;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // If the external API returns an error, use its status code
    if (error.response) {
      res.status(error.response.status).json({
        error: {
          message: "Failed to fetch currencies list from external API",
          detail: `${error.response.status} (${error.response.statusText})`,
        },
      });
    } else {
      // For other types of errors (such as network issues), return a 500 status
      res.status(500).json({
        error: { message: "Internal server error", detail: error.message },
      });
    }
  }
};

module.exports = { getCurrenciesList };
