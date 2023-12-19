const { UserModel } = require("../../model");
const HangoutModel = require("../../model/HangoutModel/HangoutModel");
const UserEventsModel = require("../../model/UserModel/UserEventsModel");
const UserService = require("../UserService/UserService")

/**
 * @typedef {Object} AddHangoutArgs
 * @property {string} userId
 * @property {string} title
 * @property {string} description
 * @property {stirng} location
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
 * @property {number} eventId
 * @property {string} title
 * @property {string} description
 * @property {string} imageURL
 * @property {string} location
 * @property {string} estimatedOutput
 */

/**@param {AddHangoutArgs} args */
async function publishHangout(args){

    const hangout = await HangoutModel.create({
        title: args.title,
        description: args.description,
        location: args.location,
        imageURL: args.imageURL,
        estimatedOutput: args.estimatedOutput,
    })

    await UserEventsModel.create({
        userId: args.userId,
        eventId: hangout.getDataValue("eventId"),
    })

    return hangout;
}

/**@param {updateHangoutArgs} args */
async function updateHangoutInfo(args){
    const hangoutId = args.eventId;

    const event = await HangoutModel.findOne({
        where: {
            eventId: hangoutId,
        }
    })

    if (!event) {
        throw new Error("Event Not Found")
    }

    await HangoutModel.upsert(JSON.parse(JSON.stringify(args)))

    const updatedEvent = await HangoutModel.findOne({
        where :{
            eventId: hangoutId
        }
    })

    return {
        eventId: updatedEvent.getDataValue("eventId"),
        title: updatedEvent.getDataValue("title"),
        description: updatedEvent.getDataValue("description"),
        imageURL: updatedEvent.getDataValue("imageURL"),
        location: updatedEvent.getDataValue("location"),
        estimatedOutput: updatedEvent.getDataValue("estimatedOutput")
    }
}

/**@param {string} hangoutId */
async function getHangoutMembers(hangoutId){
    const hangout = await HangoutModel.findOne({
        where:{
            eventId: hangoutId,
        },
        include: {
            model: UserModel,
            as: "Members",
            through: UserEventsModel
        }
    })

    const members = hangout.Members;

    const result = members.map((member) => {
        return {
            userId: member.getDataValue("userId"),
            username: member.getDataValue("username"),
            photoURL: member.getDataValue("photoURL"),
        }
    })

    return result;
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
            as: "Events",
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


    const hangouts = await Promise.all(friends.map(async (friend) => {
        const friendsHangout = await getUserHangout(friend.userId);

        const hangoutList = friendsHangout["Events"];

        const tempList = hangoutList.map((hangout) => {
            return {
                eventId: hangout.getDataValue("eventId"),
                title: hangout.getDataValue("title"),
                description: hangout.getDataValue("description"),
                location: hangout.getDataValue("location")
            }
        })

        return tempList;
    }));

    const result = [].concat(...hangouts);

    return result;
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

    let joined;

    if (!userHasJoined) {
        joined = false
    } else {
        joined = true;
    }

    return {
        eventId: event.getDataValue("eventId"),
        title: event.getDataValue("title"),
        description: event.getDataValue("description"),
        imageURL: event.getDataValue("imageURL"),
        estimatedOutput: event.getDataValue("estimatedOutput"),
        location: event.getDataValue("location"),
        joined: joined,
    };
}
module.exports = {
    publishHangout,
    joinHangout,
    getHangoutAvailable,
    getHangoutDetails,
    getUserHangout,
    getHangoutMembers,
    updateHangoutInfo,
}