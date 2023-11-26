const express = require('express');
const router = express.Router();
const ExampleController = require("../../controller/ExampleController/ExampleController")

router.get("/", ExampleController.exampleControllerFunc)

module.exports = router;