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
    const body = req.body;

    res.status(201).send(await UserService.verifyUser(body))
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function register(req,res){
    const body = req.body;

    res.status(201).send(await UserService.addUser({
        username: body.username,
        password: body.password,
        email: body.email,
    }));
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateUser(req,res){

}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function deleteUser(req,res){

}

module.exports = {
    login,
    register,
    updateUser,
    deleteUser,
}