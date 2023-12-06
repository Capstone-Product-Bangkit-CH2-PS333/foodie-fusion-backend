const {Model, DataTypes} = require("sequelize");
const database = require("../../config/database");

/**
 * @typedef {Object} IUserEventsModel
 * @property {string} userId
 * @property {string} eventId
 */

/**@extends Model<IUserEventsModel> */
class UserEventsModel extends Model{}

UserEventsModel.init(
    {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        eventId: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    },
    {
        sequelize: database,
        modelName: "user_events",
        tableName: "user_events",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = UserEventsModel;

