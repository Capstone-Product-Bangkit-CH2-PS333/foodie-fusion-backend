const {UserModel} = require("../../model/index")

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

    console.log(args.username);
    if (!usernameExist) {
        if (!emailExist) {
            const result = await UserModel.create({
                userId: generateUniqueId(),
                email: args.email,
                password: args.password,
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
}

