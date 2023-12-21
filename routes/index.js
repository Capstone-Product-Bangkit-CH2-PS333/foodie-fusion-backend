const UserRoute = require("./UserRoute/UserRoute")
const HangoutRoute = require("./HangoutRoute/HangoutRoute")
const PhotoPostRoute = require("./PhotoPostRoute/PhotoPostRoute")

const routers = [
    {prefix: "/user", router: UserRoute},
    {prefix: "/hangout",router: HangoutRoute},
    {prefix: "/photo",router: PhotoPostRoute}
]

module.exports = routers;