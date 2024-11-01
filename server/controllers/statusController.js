const axios = require("axios");

const URL = process.env.UPTIME_ROBOT_API_URL || "";
const API_KEY = process.env.UPTIME_ROBOT_API_KEY || "";
const MONITOR_ID = process.env.UPTIME_ROBOT_MONITOR_ID || "";

const statusMapping = {
  0: "Paused",
  1: "Starting",
  2: "Online",
  9: "Offline",
};

const colorMapping = {
  Paused: "#FFA500",
  Starting: "#808080",
  Online: "#66bb6a",
  Offline: "#d32f2f",
};

const getApiStatus = async (req, res) => {
  try {
    const response = await axios.post(
      URL,
      {
        api_key: API_KEY,
        format: "json",
        monitors: MONITOR_ID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const monitorData = response.data;
    const status = statusMapping[monitorData.monitors[0].status] || "N/A";
    const color = colorMapping[status] || "#ffffff";

    return res.status(200).json({
      schemaVersion: 1,
      label: "API Status",
      message: status,
      color: color,
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        error: `Failed to retrieve monitor status: ${error.response.statusText} || "Unknown error"`,
      });
    } else {
      return res.status(500).json({
        error: `Error fetching data: ${
          error.message || "Internal server error"
        }`,
      });
    }
  }
};

module.exports = { getApiStatus };
