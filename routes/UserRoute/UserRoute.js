const express = require('express');
const router = express.Router();
const UserController = require("../../controller/UserController/UserController");

router.post("/login", UserController.login)
router.post("/register",UserController.register)
router.post("/delete",UserController.deleteUser)
router.post("/update",UserController.updateUser)

module.exports = router;