const {UserModel} = require("../../model/index")
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")
const UserFriendModel = require("../../model/UserModel/UserFriendsModel")

/**
 * @typedef {Object} AddUserArgs
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} UpdateUserArgs
 * @property {string} userId
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} photoURL
 * @property {string} phoneNo
 * @property {boolean} private
 */

/**
 * @typedef {Object} UserLoginArgs
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} AddFriendArgs
 * @property {string} userId;
 * @property {string} friendId;
 */


/**@param {AddUserArgs} args */
async function addUser(args){
    // TODO: DO validity checks for email, passowrd, and username

    const usernameExist = await UserModel.findOne({
        where: {
            username: args.username,
        }
    })
    const emailExist = await UserModel.findOne({
        where :{
            email: args.email,
        }
    })

    const hashedPass = await argon2.hash(args.password)
    if (!usernameExist) {
        if (!emailExist) {
            const result = await UserModel.create({
                userId: generateUniqueId(),
                email: args.email,
                password: hashedPass,
                username: args.username,
            });
            return result;
        } else {
            throw new Error("Email has already been used")
        }
    }
    else {
        throw new Error("Username has already been used")
    }
 }

/**@param {string} userId */
async function getUserById(userId){
    const user = await UserModel.findOne({
        where: {
            userId: userId,
        }
    })

    if (!user) {
        throw new Error("User Not Found")
    } else {
        return user;
    }
    
}

/**@param {string} email */
async function getUserByEmail(email){
    const user = await UserModel.findOne({
        where: {
            email: email,
        }
    })

    if (!user) {
        throw new Error("User Not Found")
    } else {
        return user;
    }
}
/**@param {string} username */
async function getUserByUsername(username){
    const user = await UserModel.findOne({
        where: {
            username: username,
        }
    })

    return user;
}

/**@param {UpdateUserArgs} args */
async function updateUser(args){
    const userId = args.userId;
    console.log(args);
    const user = await UserModel.findOne({
        where:{
            userId: userId,
        }
    })

    if (!user) {
        throw new Error("User not Found");
    }

    if (args.username){
        console.log("Checking Username");
        const usernameExist = await getUserByUsername(args.username);

        if (usernameExist) {
            throw new Error("Username already Exists");
        }
    }
    const updatedUser = await UserModel.upsert(JSON.parse(JSON.stringify(args)));

    return args;
}

async function deleteUser(userId){
    const user = await UserModel.findOne({
        where:{
            userId: userId,
        }
    })

    if (!user) {
        throw new Error("User not Found");
    }

    const deletedUser = await UserModel.destroy({
        where: {
            userId: userId
        }
    })

    return null;
}

/**@param {UserLoginArgs} args */
async function verifyUser(args) {
    const user = await UserModel.findOne({
        where: {
            username: args.username,
        }
    })

    if (!user) {
        throw new Error("User not Found")
    } else {
        const isPasswordCorrect = await argon2.verify(user.getDataValue("password"),args.password)
        if (isPasswordCorrect) {
            const authToken = jwt.sign({"userId": user.getDataValue("userId"),
                                        "username": args.username,
                                        "password": args.password},
            process.env.JWT_SECRET_TOKEN)

            return {
                "message" : "Login Success",
                "token": authToken
            }
        }
    }
}

async function getAllFriends(userId){
    const user = await UserModel.findOne({
        where: {
            userId: userId,
        },
        include: {
            model: UserModel,
            as: "Friends",
            through: UserFriendModel,
        }
    })

    if (!user) {
        throw new Error("User Not Found")
    }

    const friends = user.Friends;

    const result = friends.map((friend) => {
        return {
            "userId": friend.getDataValue("userId"),
            "username": friend.getDataValue("username"),
        }
    })

    return result;
}

async function isUserPrivate(userId){
    const user = await UserModel.findOne({
        where: {
            userId: userId
        }
    })

    const private = user.getDataValue("isPrivate");
    return private;
}

/**@param {AddFriendArgs} args */
async function addFriendRequest(args){
    const targetFriend = await UserModel.findOne({
        where: {
            userId: args.friendId
        }
    })

    if (!targetFriend) {
        throw new Error("User Not Found")
    }

    const userPrivate = await isUserPrivate(targetFriend.getDataValue("userId"));
    if (userPrivate) {

    } else {
        
    }
}

async function handleFriendRequest(accept){

}


function generateUniqueId() {
    // Get the current timestamp
    const timestamp = new Date().getTime();
  
    // Generate a random number (you can use a more sophisticated method if needed)
    const random = Math.floor(Math.random() * 10000);
  
    // Concatenate timestamp and random number to create a unique ID
    const uniqueId = `${timestamp}${random}`;
  
    return uniqueId;
  }




module.exports = {
    getUserByEmail,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
    addUser,
    verifyUser,
    getAllFriends,
}

