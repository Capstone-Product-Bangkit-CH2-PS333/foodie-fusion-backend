const {Model, DataTypes} = require('sequelize');
const database = require("../../config/db")

/**
 * @typedef {Object} IExampleModel
 * @property {number} testId
 * @property {string} testColumn
 */

/**@extends Model<IExampleModel> */
class ExampleModel extends Model{}

ExampleModel.init(
    {
        testId: {
            type: DataTypes.INTEGER,
            field: "test_id",
            primaryKey: true
        },
        testColumn: {
            type: DataTypes.STRING,
            field: "test_column",
        }
    },
    {
        sequelize: database,
        modelName: "example_model",
        tableName: "example_model",
        timestamps: false,
        freezeTableName: true,
    }
)

module.exports = ExampleModel;