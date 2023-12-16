const express = require('express');
const router = express.Router();
const UserController = require("../../controller/UserController/UserController");

router.post("/login", UserController.login)
router.post("/register",UserController.register)
router.delete("/:userId",UserController.deleteUser)
router.put("/:userId",UserController.updateUser)
router.get("/friends/:userId",UserController.getUserFriends);

module.exports = router;