const express = require("express");
const router = express.Router();
const HangoutController = require("../../controller/HangoutController/HangoutController");
const { authenticateUserToken } = require("../../middleware/auth");


router.get("/:hangoutId",authenticateUserToken,HangoutController.getHangoutById)
router.get("/",authenticateUserToken,HangoutController.getAvailableHangouts)
router.post("/",authenticateUserToken,HangoutController.createHangout)
router.put("/:hangoutId",authenticateUserToken,HangoutController.updateHangout)
router.get("/members/:hangoutId",authenticateUserToken,HangoutController.getHangoutMembers)
router.put("/join/:hangoutId",authenticateUserToken,HangoutController.joinHangout)

module.exports = router;

