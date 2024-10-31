# Currency Converter - React/Node.js Project

![Project Status](https://img.shields.io/badge/Project%20Status-In%20Progress-orange?style=flat-square)
[![CodeFactor](https://www.codefactor.io/repository/github/lindabgaa/currency-converter/badge?style=flat-square)](https://www.codefactor.io/repository/github/lindabgaa/currency-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcurrency-converter-server-2bge.onrender.com%2Fapi%2Fstatus&style=flat-square)](https://stats.uptimerobot.com/Upe7finkYZ/797948379)

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

  - `PORT` # The port on which your API will run locally (e.g., 8080)
  - `CORS_ORIGINS` # Allowed origins for CORS requests
  - `EXCHANGERATE_API_KEY` # Your exchangerates API key
  - `EXCHANGERATE_API_BASE_URL` # (e.g., https://api.exchangeratesapi.io/v1/)

- Start the development server: `npm run dev`

5. **Set up the Client**

- Navigate to the client directory: `cd ../client`
- Install dependencies: `npm install`
- Create an .env file with the following content :
  - `VITE_URL_SERVER` # The URL where the server is hosted in production
- Start the client application : `npm run dev`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
