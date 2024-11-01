const express = require("express");

const { getApiStatus } = require("../controllers/statusController");
const { getCurrencyList } = require("../controllers/currencyController");
const { getConversionResult } = require("../controllers/conversionController");

const router = express.Router();

router.get("/status", getApiStatus);
router.get("/currency-list", getCurrencyList);
router.get("/conversion-result", getConversionResult);

module.exports = router;
