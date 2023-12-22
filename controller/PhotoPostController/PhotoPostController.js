
const { bucket } = require("../../middleware/upload");
const { format } = require("util");
const PhotoPostService = require("../../services/PhotoPostService/PhotoPostService")
/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @param {Request} req
 * @param {Response} res
 */

async function getAllPhotoLabels(req,res){
    try {
        res.status(200).send(await PhotoPostService.getAllPhotoLabels());
    } catch (error){
        res.status(400).send({
            "message": error.message,
        })
    } 
}

/**
 * @param {Request} req
 * @param {Response} res
 */

async function publishPhotoPost(req,res){
    try {
        const body = req.body;
        if (req.file) {
            const file = req.file;
            const options = {
                destination: file.originalname,
                metadata : {
                    contentType: file.mimetype,
                }
            }
            const blob = bucket.file(file.originalname)
            const blobStream = blob.createWriteStream({
                resumable: false,
            })
            blobStream.on("error", (err) => {
                res.status(500).send({ message: err.message });
            });
            blobStream.on("finish", async (data) => {
                // Create URL for directly file access via HTTP.
                const publicUrl = format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
          
                try {
                    // Make the file public
                    fileURL = publicUrl;
                    const result = await PhotoPostService.publishPhotoPost({
                        caption: body.caption,
                        location: body.location,
                        imageURL: publicUrl,
                        buffer: req.file.buffer,
                        originalname: req.file.originalname,
                        blob: blob
                    })
                    res.status(200).send(result)
                } catch {
                    return res.status(500).send({
                        message:
                        `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                        url: publicUrl,
                    })
                }
                
            });
            blobStream.end(req.file.buffer);
        }
    } catch (error){
        res.status(400).send({
            "message": error.message,
        })
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */

async function getPhotoPostDetail(req,res){
    try {
        const photoId = req.params.photoId;
        res.status(200).send(await PhotoPostService.getPhotoPostDetail(photoId))
    } catch (error){
        res.status(400).send({
            "message": error.message,
        })
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */

async function getAllPhotoPost(req,res){
    try {
        const label = req.query.label;
        res.status(200).send(await PhotoPostService.getAllPhotoPost({
            label: label
        }))
    } catch(error){
        res.status(400).send({
            "message": error.message,
        })
    }
}

module.exports = {
    publishPhotoPost,
    getPhotoPostDetail,
    getAllPhotoPost,
    getAllPhotoLabels
}