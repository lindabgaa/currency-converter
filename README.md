# Currency Converter - React/Express Project

![Project Status](https://img.shields.io/badge/Project%20Status-Finished-green?style=flat-square)
[![CodeFactor](https://www.codefactor.io/repository/github/lindabgaa/currency-converter/badge?style=flat-square)](https://www.codefactor.io/repository/github/lindabgaa/currency-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

This project is a user-friendly currency converter built with **TypeScript**, **React**, and **CSS**. It uses the **Vite** build tool for fast development. The application allows users to easily convert currencies by specifying the amount, the source currency, and the target currency with just a few clicks. It ensures accurate conversions by integrating with a **Node** backend that handles **API requests** to fetch real-time exchange rates. The frontend is deployed on **Vercel**, while the server is hosted on **Render.com**. The design is inspired by the [xe.com](https://www.xe.com/) website.

**[Demo](https://currency-converter-pi-six.vercel.app/)**

## Tech Stack

- **Frontend**: React, TypeScript, CSS
- **Backend**: Node, Express,
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

## Possible Improvements

- Add flags to currency list
- Include symbols in amount input field (e.g., $, €, £)
- Enhance formatting for numbers

## License

This project is licensed under the MIT License. See the **[LICENSE](LICENSE)** file for more information.
