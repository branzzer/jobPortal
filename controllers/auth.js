const User = require("../models/user")
const bcrypt = require('bcrypt');
const resgisterNewUser = async (req, res, next) => {


    const { name, email, password } = req.body
    // if (!name) return next("please provide name")
    // if (!email) return next("please provide email")
    // if (!password) return next('please provide password')

    // const userExist = await User.findOne({ email })
    // if (userExist) return next('User already exist')

    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    return res.status(201).json({
        success: true,
        message: "user created successfuly",
        user,
        token
    })




}

const loginUser = async (req, res, next) => {

    const { email, password } = req.body
    console.log("inside login ")
    if (!email || !password) {
        return next('plz enter email and password')
    }

    const user = await User.findOne({ email })
    if (!user) return next('invalid email or password [user not found]')

    const isMatched = await user.comparePassword(password)


    if (!isMatched) return next("invalid email or password[worng password]")

    const token = user.createJWT();


    res.status(200).json({
        success: true,
        message: 'successfuly log in',
        user,
        token
    });


}


module.exports = {
    resgisterNewUser,
    loginUser
}