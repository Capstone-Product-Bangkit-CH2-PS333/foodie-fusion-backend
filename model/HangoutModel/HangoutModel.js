const {Model, DataTypes} = require("sequelize");
const database = require("../../config/database");
const UserModel = require("../UserModel/UserModel");
const UserEventsModel = require("../UserModel/UserEventsModel");

/**
 * @typedef {Object} IHangoutModel
 * @property {string} eventId
 * @property {string} title
 * @property {string} description
 * @property {string} location
 * @property {string} imageURL
 * @property {number} estimatedOutput
 */

/**@extends Model<IHangoutModel> */
class HangoutModel extends Model{}

HangoutModel.init(
    {
        eventId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            field: "event_id"
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "title"
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "description",
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "image_url",
        },
        estimatedOutput: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "estimated_output"
        }
    },
    {
        sequelize: database,
        tableName: "hangout",
        modelName: "hangout",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = HangoutModel;