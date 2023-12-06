const UserService = require("../../services/UserService/UserService")

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
        const body = req.body;
        res.status(204).send(await UserService.updateUser({
            body
        }))
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

module.exports = {
    login,
    register,
    updateUser,
    deleteUser,
    getUserFriends
}