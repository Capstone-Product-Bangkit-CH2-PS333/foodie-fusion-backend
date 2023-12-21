const express = require("express");
const PhotoPostController = require("../../controller/PhotoPostController/PhotoPostController")
const {upload} = require("../../middleware/upload")
const {authenticateUserToken} = require("../../middleware/auth");
const router = express.Router();

router.get("/",authenticateUserToken, PhotoPostController.getAllPhotoPost)
router.get("/label",authenticateUserToken,PhotoPostController.getAllPhotoLabels)
router.get("/:photoId",authenticateUserToken,PhotoPostController.getPhotoPostDetail)
router.post("/",authenticateUserToken,upload, PhotoPostController.publishPhotoPost)

module.exports = router;