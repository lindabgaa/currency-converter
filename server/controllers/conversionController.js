const axios = require("axios");

const API_KEY = process.env.EXCHANGERATE_API_KEY;
const BASE_URL = process.env.EXCHANGERATE_API_BASE_URL;

const getConversionResult = async (req, res) => {
  const { from, to, amount } = req.query;

  // if any of the parameters are missing, return a 400 status
  if (!from || !to || !amount) {
    return res.status(400).json({
      error: {
        message: "Missing required parameters",
        detail: "Parameters 'from', 'to', and 'amount' are required.",
      },
    });
  }

  const endPoint = "convert";
  const params =
    `?access_key=${API_KEY}` +
    `&from=${from}` +
    `&to=${to}` +
    `&amount=${amount}`;

  const url = BASE_URL + endPoint + params;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: {
          message: "Failed to fetch conversion result from external API",
          detail: `${error.response.status} (${error.response.statusText})`,
        },
      });
    } else {
      res.status(500).json({
        error: {
          message: "Internal server error",
          detail: error.message,
        },
      });
    }
  }
};

module.exports = { getConversionResult };
