const axios = require("axios");

const URL = process.env.UPTIME_ROBOT_API_URL;
const API_KEY = process.env.UPTIME_ROBOT_API_KEY;
const MONITOR_ID = process.env.UPTIME_ROBOT_MONITOR_ID;

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
    const status = monitorData.monitors[0].status === 2 ? "Online" : "Offline";
    const color = status === "Online" ? "#66bb6a" : "#d32f2f";

    return res.status(200).json({
      schemaVersion: 1,
      label: "API Status",
      message: status,
      color: color,
    });
  } catch (error) {
    if (error.response) {
      return res.status(response.status).json({
        error: `Failed to retrieve monitor status: ${response.statusText} || "Unknown error"`,
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
