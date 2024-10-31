# Currency Converter - React/Node.js Project

![Project Status](https://img.shields.io/badge/Project%20Status-In%20Progress-orange?style=flat-square)
[![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcurrency-converter-server-2bge.onrender.com%2Fapi%2Fstatus&style=flat-square)](https://stats.uptimerobot.com/Upe7finkYZ/797948379)
[![CodeFactor](https://www.codefactor.io/repository/github/lindabgaa/currency-converter/badge?style=flat-square)](https://www.codefactor.io/repository/github/lindabgaa/currency-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

This project is a user-friendly currency converter built with **TypeScript**, **React**, and **CSS**. It uses the **Vite** build tool for fast development. The application allows users to easily convert currencies by specifying the amount, the source currency, and the target currency with just a few clicks. It ensures accurate conversions by integrating with a **Node.js** backend that handles **API requests** to fetch real-time exchange rates.
The frontend is deployed on **Vercel**, while the server is hosted on **Render**.

[Demo](https://currency-converter-pi-six.vercel.app/)

## Tech Stack

- **Frontend**: React/Vite, Axios, TypeScript, CSS
- **Backend**: Node.js, Express, Axios
- **API**: [exchangeratesapi.io](https://exchangeratesapi.io/)

## Installation & Setup

1. **Clone the repository**: `git clone https://github.com/lindabgaa/currency-converter.git`
2. **Navigate to the project folder**: `cd currency-converter`
3. **Create an account on** [exchangeratesapi.io](https://exchangeratesapi.io/)
4. **Set up the Server**

- Naviguate to the server directory : `cd server`
- Install dependencies: `npm install`
- Create an .env file with the following content :

  - `PORT` (e.g., `8080`)
  - `CORS_ORIGINS` (e.g., `http://localhost:PORT,https://YOUR_DOMAIN.com`)
  - `EXCHANGERATE_API_KEY` # Your exchangerates API key
  - `EXCHANGERATE_API_BASE_URL` # (e.g., `https://api.exchangeratesapi.io/v1/`)

- Start the development server: `npm run dev`

5. **Set up the Client**

- Navigate to the client directory: `cd ../client`
- Install dependencies: `npm install`
- Create an .env file with the following content :
  - `VITE_URL_SERVER` # The URL where the server is hosted in production
- Start the client application : `npm run dev`

## Endpoint /api/status

The /api/status endpoint uses Uptime Robot to display the API’s current status (online or offline), enabling the status badge in GitHub.

**Note**: If you prefer not to include this endpoint, make sure to:

1. Remove the `statusController.js` file from your server directory.
2. Remove the corresponding route for `/api/status` from your routing setup.

To set up this endpoint, follow these steps:

1. **Create an account on** [Uptime Robot](https://uptimerobot.com/).
2. **Create a new monitor:**

   - After logging in, click on “New Monitor”.
   - Choose “HTTP(s)” as the monitor type.
   - Enter the URL of your API.
   - Set the monitoring interval (e.g., 5 minutes).
   - Click “Create Monitor”.

3. **Retrieve your API key:**

   - Select “Integrations & API” to find your API Key.

4. **Obtain your Monitor ID:**

   - You can use [Hoppscotch](https://hoppscotch.io/) to make a quick POST request to `https://api.uptimerobot.com/v2/getMonitors?api_key=YOUR_KEY` using your API key. The response will contain the ID of your monitor.

5. **Set up environment variables in your server .env file:**

   - UPTIME_ROBOT_API_URL (e.g., `https://api.uptimerobot.com/v2/getMonitors`)
   - UPTIME_ROBOT_API_KEY : # Your Uptime Robot API key
   - UPTIME_ROBOT_MONITOR_ID : # ID of your Uptime Robot monitor

6. **Create a Status page:**

   - After logging in, go to the "Status Pages" section.
   - Click on "Create Status Page".
   - Fill in the required details, such as the name and description of your status page.
   - Select the monitors you want to include
   - Click "Create Status Page".

7. **Create a badge on [Shields.io](https://shields.io/):**

   - Choose to create an Endpoint Badge.
   - Specify the URL of your API status endpoint (e.g., `https://YOUR_DOMAIN/api/v1/status`).
   - Use the generated badge URL in your README to display the current status of your API.
   - Set the link for the badge to your status page, allowing users to click on the badge to view the Uptime Robot
   - status page directly.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
