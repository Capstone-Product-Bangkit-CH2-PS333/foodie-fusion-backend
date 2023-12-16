const HangoutService = require("../../services/HangoutService/HangoutService")

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getHangoutById(req,res){

    try {
        const hangoutId = req.params.hangoutId;
        const userId = req.userId;
        res.status(200).send(await HangoutService.getHangoutDetails({
            userId: userId,
            hangoutId: hangoutId,
        }));
    } catch(error) {
        res.status(400).send({
            "message": error.message,
        })
    }
}

async function getAvailableHangouts(req,res) {
    try {
        const userId = req.userId;
        const hangouts = await HangoutService.getHangoutAvailable(userId);

        res.status(200).send(hangouts);
    } catch(error) {
        res.status(400).send({
            "message": error.message,
        })
    }
}

module.exports =  {
    getAvailableHangouts,
    getHangoutById
}