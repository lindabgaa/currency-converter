const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "http://localhost:5173",
};

dotenv.config();

app.use(cors(corsOptions));

// Test server
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

const apiKey = process.env.API_KEY;
const baseUrl = "https://api.exchangeratesapi.io/v1/";

if (!apiKey) {
  console.error("API key is missing. Please check your .env file.");
  process.exit(1); // Stop the server if the API key is missing
}

app.get("/api/fetchCurrenciesList", async (req, res) => {
  const endPoint = "symbols";
  const params = `?access_key=${apiKey}`;
  const url = baseUrl + endPoint + params;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // If the external API returns an error, use its status code
    if (error.response) {
      res.status(error.response.status).json({
        message: "Failed to fetch currencies list from external API",
        error: `${error.response.status} (${error.response.statusText})`,
      });
    } else {
      // For other types of errors (such as network issues), return a 500 status
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
});

app.get("/api/fetchConversionResult", async (req, res) => {
  const { from, to, amount } = req.query;

  // if any of the parameters are missing, return a 400 status
  if (!from || !to || !amount) {
    return res.status(400).json({
      message: "Parameters 'from', 'to', and 'amount' are required.",
      error: "Missing required parameters",
    });
  }

  const endPoint = "convert";
  const params =
    `?access_key=${apiKey}` +
    `&from=${from}` +
    `&to=${to}` +
    `&amount=${amount}`;
  const url = baseUrl + endPoint + params;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        message: "Failed to fetch conversion result from external API",
        error: `${error.response.status} (${error.response.statusText})`,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
});

// Run the server
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
