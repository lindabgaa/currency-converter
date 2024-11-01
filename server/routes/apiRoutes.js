const express = require("express");

const { getApiStatus } = require("../controllers/statusController");
const { getCurrenciesList } = require("../controllers/currenciesController");
const { getConversionResult } = require("../controllers/conversionController");

const router = express.Router();

router.get("/status", getApiStatus);
router.get("/currencies/list", getCurrenciesList);
router.get("/conversion/result", getConversionResult);

module.exports = router;
