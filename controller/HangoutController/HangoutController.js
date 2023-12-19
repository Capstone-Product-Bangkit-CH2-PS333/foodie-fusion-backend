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
/**
 * @param {Request} req
 * @param {Response} res
 */
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
/**
 * @param {Request} req
 * @param {Response} res
 */
async function createHangout(req,res){
    try {
        const userId = req.userId;
        const body = req.body;

        res.status(200).send(await HangoutService.publishHangout({
            userId: userId,
            title: body.title,
            description: body.description,
            estimatedOutput: body.estimatedOutput,
            location: body.location,
            imageURL: body.imageURL,
        }))
    } catch(error) {
        res.status(400).send({
            "message": error.message,
        })
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function joinHangout(req,res){
    try{
        const userId = req.userId;
        const hangoutId = req.params.hangoutId;

        res.status(200).send(await HangoutService.joinHangout({
            userId: userId,
            hangoutId: hangoutId,
        }))
    } catch(error) {
        res.status(400).send({
            "message": error.message,
        })
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getHangoutMembers(req,res){
    try {
        const hangoutId = req.params.hangoutId;
        res.status(200).send(await HangoutService.getHangoutMembers(hangoutId))
    } catch(error) {
        res.status(400).send({
            "message": error.message,
        })
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateHangout(req,res){
    try {
        const hangoutId= req.params.hangoutId;
        const body = req.body;
        res.status(200).send(await HangoutService.updateHangoutInfo({
            eventId: body.eventId,
            title: body.title,
            description: body.description,
            location: body.location,
            estimatedOutput: body.estimatedOutput,
            
        }))
    }catch(error) {
        res.status(400).send({
            "message": error.message,
        })
    }
}

module.exports =  {
    getAvailableHangouts,
    getHangoutById,
    createHangout,
    joinHangout,
    getHangoutMembers,
    updateHangout,
}