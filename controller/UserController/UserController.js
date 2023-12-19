const UserService = require("../../services/UserService/UserService")
const {bucket} = require("../../middleware/upload")
const { format } = require("util");

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */


/**
 * @param {Request} req
 * @param {Response} res
 */
async function login(req,res){
    try {
        const body = req.body;

        res.status(201).send(await UserService.verifyUser(body))
    }  catch (error) {
        res.status(400).send({
            "message": error.message,
        })
    } 
    
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function register(req,res){
    try {
        const body = req.body;

        res.status(201).send(await UserService.addUser({
            username: body.username,
            password: body.password,
            email: body.email,
        }));
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            "message": error.message,
        })
    }
    
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateUser(req,res){
    try {
        const userId = req.params.userId;
        const body = req.body;
        let fileURL = null;
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
                    const result = await UserService.updateUser({
                        userId: userId,
                        username: body.username,
                        password: body.password,
                        email: body.email,
                        phoneNo: body.phoneNo,
                        photoURL: publicUrl,
                        private: body.private,
                    })
                    console.log(result);
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
        } else {
            res.status(200).send(await UserService.updateUser({
                userId: userId,
                username: body.username,
                password: body.password,
                email: body.email,
                phoneNo: body.phoneNo,
                photoURL: body.fileURL,
                private: body.private,
            }))
        }
    } catch (error) {
        res.status(400).send({
            "message": error.message,
        })
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function deleteUser(req,res){
    try {
        const userId = req.params.userId;
        res.status(200).send(await UserService.deleteUser(userId))
    } catch (error) {
        res.status(400).send({
            "message":error.message,
        })
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getUserFriends(req,res){
    try {
        const userId = req.params.userId;
        const friends = await UserService.getAllFriends(userId);

        res.status(200).send(friends);
    }catch (error) {
        res.status(400).send({
            "message":error.message,
        })
    }
}


/**
 * @param {Request} req
 * @param {Response} res
 */
async function getUserbyId(req,res) {
    try {
        const userId = req.params.userId;

        res.status(200).send(await UserService.getUserById(userId));
    } catch (error) {
        res.status(400).send({
            "message":error.message,
        })
    }
}

module.exports = {
    login,
    register,
    updateUser,
    deleteUser,
    getUserbyId,
    getUserFriends
}