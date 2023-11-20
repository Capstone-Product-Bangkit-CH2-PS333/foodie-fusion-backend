/**
 * DATABASE CONFIG FILE
 */
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_password,
    {
        host: process.env.DB_HOST,
        dialect:'mysql',
        logging: false,
        define: {
            timestamps: false
        }
    }
)

module.exports = sequelize;