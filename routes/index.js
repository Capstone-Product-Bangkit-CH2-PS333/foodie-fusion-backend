const UserRoute = require("./UserRoute/UserRoute")

const routers = [
    {prefix: "/user", router: UserRoute}
]

module.exports = routers;