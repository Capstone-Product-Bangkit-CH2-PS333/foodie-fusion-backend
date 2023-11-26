const {UserModel} = require("../../model/index")
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")

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
 */

/**
 * @typedef {Object} UserLoginArgs
 * @property {string} username
 * @property {string} password
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
            return {
                message: "Email has already been used"
            }
        }
    }
    else {
        return {
            message: "Username Already Exists"
        }
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
        return {
            message: "User not found"
        }
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
        return {
            message: "User not found"
        }
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

    if (!user) {
        return {
            message: "User not found"
        }
    } else {
        return user;
    }
}

/**@param {UpdateUserArgs} args */
async function updateUser(args){

}

/**@param {UserLoginArgs} args */
async function verifyUser(args) {
    const user = await UserModel.findOne({
        where: {
            username: args.username,
        }
    })

    if (!user) {
        return {
            "message": "User Not Found"
        }
    } else {
        const isPasswordCorrect = await argon2.verify(user.getDataValue("password"),args.password)
        if (isPasswordCorrect) {
            const authToken = jwt.sign({"username": args.username,"password": args.password},
            process.env.JWT_SECRET_TOKEN)

            return {
                "message" : "Login Success",
                "token": authToken
            }
        }
    }
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
    addUser,
    verifyUser
}

