const express = require("express");
const router = express.Router();
const HangoutController = require("../../controller/HangoutController/HangoutController");
const { authenticateUserToken } = require("../../middleware/auth");


router.get("/:hangoutId",authenticateUserToken,HangoutController.getHangoutById)
router.get("/",authenticateUserToken,HangoutController.getAvailableHangouts)

module.exports = router;

