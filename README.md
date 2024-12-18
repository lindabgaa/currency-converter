# Currency Converter - React/Node.js Project

![Project Status](https://img.shields.io/badge/Project%20Status-Finished-green?style=flat-square)
[![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcurrency-converter-server-2bge.onrender.com%2Fapi%2Fstatus&style=flat-square)](https://stats.uptimerobot.com/Upe7finkYZ/797948379)
[![CodeFactor](https://www.codefactor.io/repository/github/lindabgaa/currency-converter/badge?style=flat-square)](https://www.codefactor.io/repository/github/lindabgaa/currency-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

This project is a user-friendly currency converter built with **TypeScript**, **React**, and **CSS**. It uses the **Vite** build tool for fast development. The application allows users to easily convert currencies by specifying the amount, the source currency, and the target currency with just a few clicks. It ensures accurate conversions by integrating with a **Node.js** backend that handles **API requests** to fetch real-time exchange rates.
The frontend is deployed on **Vercel**, while the server is hosted on **Render**.

**[Demo](https://currency-converter-pi-six.vercel.app/)**

## Tech Stack

- **Frontend**: React/Vite, Axios, TypeScript, CSS
- **Backend**: Node.js, Express, Axios
- **API**: **[ExchangeRate-API](https://www.exchangerate-api.com/)**

## Installation & Setup

1. **Clone the repository**: `git clone https://github.com/lindabgaa/currency-converter.git`
2. **Navigate to the project folder**: `cd currency-converter`
3. **Create an account on [ExchangeRate-API](https://www.exchangerate-api.com/)**
4. **Set up the Server**

- Navigate to the server directory : `cd server`
- Install dependencies: `npm install`
- Create an **.env** file with the following content :
  - `PORT` # (e.g., `8080`)
  - `CORS_ORIGINS` # Comma-separated frontend URLs allowed to access your server's API
  - `EXCHANGERATE_API_KEY` # Your API key from **[ExchangeRate-API](https://www.exchangerate-api.com/)**
  - `EXCHANGERATE_API_BASE_URL` # (e.g., `https://v6.exchangerate-api.com/v6/`)
- Start the development server: `npm run dev`

5. **Set up the Client**

- Navigate to the client directory: `cd ../client`
- Install dependencies: `npm install`
- Create an **.env** file with the following content :
  - `VITE_ENV` # Runtime environment (set to 'development' or 'production')
  - `VITE_LOCAL_SERVER_URL` # URL of your local server (e.g., `http://localhost:8080`)
  - `VITE_DEPLOYED_SERVER_URL` # URL of your hosted server
- Start the client application : `npm run dev`

## /api/status

The `/api/status` route uses **[Uptime Robot](https://uptimerobot.com/)** to display the API’s current status (paused, starting, online, offline), enabling the status badge in GitHub.

**Note**: If you prefer not to include this endpoint, make sure to:

1. Remove the `statusController.js` file from your server directory.
2. Remove the corresponding route for `/api/status` from the `apiRoutes.js` file.

To set up this endpoint, follow these steps:

1. **Create an account on [Uptime Robot](https://uptimerobot.com/).**
2. **Create a new monitor:**

- After logging in, click on “New Monitor”.
- Choose “HTTP(s)” as the monitor type.
- Enter the URL you want to monitor (e.g., `https://YOUR_DOMAIN.com/api/currencies/list`).
- Set the monitoring interval (e.g., 5 minutes).
- Click “Create Monitor”.

3. **Retrieve your API key:**

- Select **“Integrations & API”** to find your API Key.

4. **Obtain your Monitor ID:**

- You can use **[Hoppscotch](https://hoppscotch.io/)** to make a quick **POST** request to `https://api.uptimerobot.com/v2/getMonitors?api_key=YOUR_KEY` using your API key. The response will contain the ID of your monitor.

5. **Set up environment variables in your server .env file:**

- `UPTIME_ROBOT_API_URL` # (e.g., `https://api.uptimerobot.com/v2/getMonitors`)
- `UPTIME_ROBOT_API_KEY` # Your Uptime Robot API key
- `UPTIME_ROBOT_MONITOR_ID` # ID of your Uptime Robot monitor

6. **Create a Status page:**

- After logging in, go to the "Status Pages" section.
- Click on "Create Status Page".
- Fill in the required details.
- Select the monitors you want to include.
- Click "Create Status Page".

7. **Create a badge on [Shields.io](https://shields.io/):**

- Choose to create an **Endpoint Badge**.
- Specify the URL of your API status endpoint (e.g., `https://YOUR_DOMAIN/api/status`).
- Use the generated badge URL in your **README** to display the current status of your API.
- Set the link for the badge to your **status page**, allowing users to click on the badge to view the **Uptime Robot** status page directly.

## Possible Improvements

- Add flags to currency list
- Include symbols in amount input field (e.g., $, €, £)
- Enhance formatting for numbers

## License

This project is licensed under the MIT License. See the **[LICENSE](LICENSE)** file for more information.
