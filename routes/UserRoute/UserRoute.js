const express = require('express');
const router = express.Router();
const UserController = require("../../controller/UserController/UserController");
const {upload} = require("../../middleware/upload")
const {authenticateUserToken} = require("../../middleware/auth")
 
router.post("/login", UserController.login)
router.post("/register",UserController.register)
router.delete("/:userId",authenticateUserToken,UserController.deleteUser)
router.put("/:userId",authenticateUserToken,upload,UserController.updateUser)
router.get("/friends/:userId",authenticateUserToken,UserController.getUserFriends);
router.get("/:userId",authenticateUserToken, UserController.getUserbyId)
router.get("/friends/recommendation/:userId",authenticateUserToken,UserController.getFriendRecommendations)

module.exports = router;