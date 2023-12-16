const { UserModel } = require("../../model");
const HangoutModel = require("../../model/HangoutModel/HangoutModel");
const UserEventsModel = require("../../model/UserModel/UserEventsModel");
const UserService = require("../UserService/UserService")

/**
 * @typedef {Object} AddHangoutArgs
 * @property {string} userId
 * @property {string} title
 * @property {string} description
 * @property {string} imageURL
 * @property {number} estimatedOutput 
 */
/**
 * @typedef {Object} JoinHangoutArgs
 * @property {string} userId
 * @property {string} hangoutId
 */

/**
 * @typedef {Object} updateHangoutArgs
 * @property {string} eventId
 */


/**@param {AddHangoutArgs} args */
async function publishHangout(args){
    const eventId = generateUniqueId();

    const hangout = await HangoutModel.create({
        eventId: eventId,
        title: args.title,
        description: args.description,
        imageURL: args.imageURL,
        estimatedOutput: args.estimatedOutput,
    })

    await UserEventsModel.create({
        userId: args.userId,
        eventId: eventId,
    })

    return hangout;
}

/**@param {JoinHangoutArgs} args */
async function joinHangout(args){
    const userId = args.userId;
    const eventId = args.hangoutId;

    const user = await UserModel.findOne({
        where: {
            userId: userId,
        }
    })

    if (!user) {
        throw new Error("User Not Found");
    }

    const result = await UserEventsModel.create({
        userId: userId,
        eventId: eventId,
    })

    return result;
}

async function getUserHangout(userId){
    const hangouts = await UserModel.findOne({
        where: {
            userId: userId,
        },
        include: {
            model: HangoutModel,
            through: UserEventsModel,
            as: "Hangouts",
        }
    })

    return hangouts;
}

async function getHangoutAvailable(userId){
    const user = await UserModel.findOne({
        where: {
            userId: userId,
        }
    })

    if (!user) {
        throw new Error("User Not Found");
    }

    const friends = await UserService.getAllFriends(userId);

    let hangouts = [];

    await Promise.all(friends.forEach(async (friend) => {
        const hangoutList = await getUserHangout(friend.userId);

        hangoutList.forEach((hangout) => {
            hangouts.push(hangout.getDataValue("Hangouts"));
        })
    }));

    return hangouts;
}

/**@param {JoinHangoutArgs} args*/
async function getHangoutDetails(args){
    const user = await UserModel.findOne({
        where: {
            userId: args.userId,
        }
    })

    if (!user) {
        throw new Error("User Not Found");
    }

    const event = await HangoutModel.findOne({
        where: {
            eventId: args.hangoutId,
        }
    })

    if (!event) {
        throw new Error("Hangout Not Found");
    }

    const userHasJoined = await UserEventsModel.findOne({
        where: {
            userId: args.userId,
            eventId: args.hangoutId,
        }
    })

    if (!userHasJoined) {
        event['joined'] = false;
    } else {
        event['joined'] = true;
    }

    return event;
}

function generateUniqueId() {
    // Get the current timestamp
    const timestamp = new Date().getTime();
  
    // Generate a random number (you can use a more sophisticated method if needed)
    const random = Math.floor(Math.random() * 10000);
  
    // Concatenate timestamp and random number to create a unique ID
    const uniqueId = `${timestamp}${random}`;
  
    return "ev_" + uniqueId;
  }

module.exports = {
    publishHangout,
    joinHangout,
    getHangoutAvailable,
    getHangoutDetails,
    getUserHangout,
}