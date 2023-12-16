const {Model, DataTypes} = require("sequelize");
const database = require("../../config/database");
const UserEventsModel = require("./UserEventsModel");
const HangoutModel = require("../HangoutModel/HangoutModel");
const UserFriendModel = require("./UserFriendsModel");

/**
 * @typedef {Object} IUserModel
 * @property {string} userId
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} phoneNo
 * @property {string} photoURL
 * @property {boolean} isPrivate
 */

/**@extends Model<IUserModel> */
class UserModel extends Model{}

UserModel.init(
    {
        userId: {
            type: DataTypes.STRING,
            field: "user_id",
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            field: "username",
        },
        email: {
            type: DataTypes.STRING,
            field: "email"
        },
        password: {
            type: DataTypes.STRING,
            field: "password",
        },
        photoURL: {
            type :DataTypes.STRING,
            field: "photo_url",
        },
        phoneNo: {
            type: DataTypes.STRING,
            field: "phone_no"
        },
        private: {
            type: DataTypes.BOOLEAN,
            field: "is_private"
        }
    },
    {
        sequelize: database,
        tableName: "user",
        modelName: "user",
        timestamps: false,
        freezeTableName: true,
    }

)

UserModel.belongsToMany(HangoutModel, {
    through: UserEventsModel,
    foreignKey: "userId",
    otherKey: "eventId"
})
UserModel.belongsToMany(UserModel, {
    through: UserFriendModel, 
    as:"Friends",
    foreignKey: "userId",    // Specify the foreign key in UserFriendModel that refers to the source UserModel
    otherKey: "friendId",
})

module.exports = UserModel;