const {Model, DataTypes} = require("sequelize");
const database = require("../../config/database");

/**
 * @typedef {object} IPhotoPostModel
 * @property {number} photoPostId
 * @property {string} caption
 * @property {string} label
 * @property {string} location
 * @property {string} imageURL
 */

/**@extends Model<IPhotoPostModel>*/
class PhotoPostModel extends Model{}

PhotoPostModel.init(
    {
        photoPostId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: "photo_post_id",
            autoIncrement: true
        }, 
        caption: {
            type: DataTypes.STRING,
            field: "caption",
            allowNull: true,
        },
        label: {
            type: DataTypes.STRING,
            field: "label",
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            field: "location",
            allowNull: true
        },
        imageURL: {
            type: DataTypes.STRING,
            field: "image_url",
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: "photo_post",
        modelName: "photo_post",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = PhotoPostModel;