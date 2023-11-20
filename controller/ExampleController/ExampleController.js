const ExampleService = require("../../services/ExampleService/ExampleService")

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @param {Request} req
 * @param {Response} res
 */
async function exampleControllerFunc(req,res) {
    try {
        const returnObject = await ExampleService.exampleServiceFunc();
        res.status(200).send(returnObject)
    }
    catch (err) {
        res.status(404).send({
            "error": "URL not Found"
        })
    }
}

module.exports = {
    exampleControllerFunc,
}