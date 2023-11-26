const {Model, DataTypes} = require("sequelize");
const database = require("../../config/database")

/**
 * @typedef {Object} IUserModel
 * @property {string} userId
 * @property {string} username
 * @property {string} email
 * @property {string} password
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

module.exports = UserModel;