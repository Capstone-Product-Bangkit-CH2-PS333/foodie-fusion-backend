const {Model, DataTypes} = require("sequelize");
const database = require("../../config/database");

/**
 * @typedef {object} IFoodSharingModel
 * @property {number} foodSharingId
 * @property {string} title
 * @property {string} description
 * @property {string} itemDescription
 * @property {number} itemAmount
 * @property {string} location
 * @property {number} pricePerItem
 * @property {string} imageURL
 */

/**@extends Model<IFoodSharingModel>*/
class FoodSharingmodel extends Model{}

FoodSharingmodel.init(
    {
        foodSharingId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: "food_sharing_id",
            autoIncrement: true
        }, 
        title: {
            type: DataTypes.STRING,
            field: "title",
            allowNull: true
        }, 
        description: {
            type: DataTypes.STRING,
            field: "description",
            allowNull: true,
        },
        itemDescription :{
            type: DataTypes.STRING,
            field: "item_description",
            allowNull: true,
        },
        itemAmount: {
            type: DataTypes.INTEGER,
            field: "item_amount",
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            field: "location",
            allowNull: true
        },
        pricePerItem: {
            type: DataTypes.INTEGER,
            field: "price_per_item",
            allowNull: true,
        },
        imageURL: {
            type: DataTypes.STRING,
            field: "image_url",
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: "food_sharing",
        modelName: "food_sharing",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = FoodSharingmodel;