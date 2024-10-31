require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGINS.split(","),
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", apiRoutes);

// Test server
app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

// Run the server
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
