const express = require('express');
const router = express.Router();
const ExampleController = require("../../controller/ExampleController/ExampleController")
const {authenticateUserToken} = require("../../middleware/auth")

router.get("/", authenticateUserToken,ExampleController.exampleControllerFunc)

module.exports = router;