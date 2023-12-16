const jwt = require("jsonwebtoken");

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

function authenticateUserToken(req, res, next) {
    const token = req.headers.token;

    if (token == null) return res.sendStatus(401);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.userId = decodedToken.userId;
        req.username = decodedToken.username;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("Please login");
    }
}

module.exports = {
    authenticateUserToken
}