require("dotenv").config();

const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : [],
};

(() => {
  const missingVars = [];

  if (!process.env.EXCHANGERATE_API_KEY) {
    missingVars.push("EXCHANGERATE_API_KEY");
  }

  if (!process.env.EXCHANGERATE_API_BASE_URL) {
    missingVars.push("EXCHANGERATE_API_BASE_URL");
  }

  if (missingVars.length > 0) {
    console.error(
      "Missing required environment variables: ",
      missingVars.join(", "),
      "\nPlease refer to the README.md file for instructions on setting up the project."
    );
    process.exit(1);
  }
})();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
