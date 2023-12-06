const {Model, DataTypes} = require("sequelize");
const database = require("../../config/database");

/**
 * @typedef {Object} IUserFriendModel
 * @property {string} userId
 * @property {string} friendId
 */

/**@extends Model<IUserFriendModel> */
class UserFriendModel extends Model{}

UserFriendModel.init(
    {
        userId: {
            type: DataTypes.STRING,
            field: "user_id",
            primaryKey: true,
        },
        friendId: {
            type: DataTypes.STRING,
            field: "friend_id",
            primaryKey: true,
        }
    },
    {
        sequelize: database,
        modelName: "user_friend",
        tableName: "user_friend",
        freezeTableName: true,
        timestamps: false,
    }
)


module.exports = UserFriendModel;

