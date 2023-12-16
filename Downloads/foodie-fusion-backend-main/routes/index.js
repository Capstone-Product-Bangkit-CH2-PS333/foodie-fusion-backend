const UserRoute = require("./UserRoute/UserRoute")
const HangoutRoute = require("./HangoutRoute/HangoutRoute")

const routers = [
    {prefix: "/user", router: UserRoute},
    {prefix: "/hangout",router: HangoutRoute}
]

module.exports = routers;