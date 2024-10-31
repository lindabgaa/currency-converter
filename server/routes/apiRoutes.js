const express = require("express");

const { getCurrenciesList } = require("../controllers/currenciesController");
const { getConversionResult } = require("../controllers/conversionController");
const { getApiStatus } = require("../controllers/statusController");

const router = express.Router();

router.get("/currencies/list", getCurrenciesList);
router.get("/conversion/result", getConversionResult);
router.get("/status", getApiStatus);

module.exports = router;
