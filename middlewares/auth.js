
const JWT = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer')) return next("Auth failed [bearer]");

    const token = authHeader.split(" ")[1];
    console.log(token)
    try {

        const payload = JWT.verify(token, process.env.JWT_SECRET)

        req.user = { userId: payload.userId }
        return next()
    } catch (error) {
        return next('Auth failed [catch]')
    }
}

module.exports = userAuth