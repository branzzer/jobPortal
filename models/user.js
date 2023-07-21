const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        // validate: {
        //     validator: function (name) {
        //    return     name.length >= 3
        //     }
        // }
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "password should be greater then equal to 6"],
        //select: false, // selected hide the password whenerver querred
        // validate: {
        //     validator: function (password) {
        //      return   password.length >= 8
        //     },
        //     message: "password should be atleast 8 digit"
        // }

    },
    location: {
        type: String,
        default: "INDIA"
    }

}, { timestamps: true })




userSchema.pre("save", async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

userSchema.methods.comparePassword = async function (password) {
    const isMatched = await bcrypt.compare(password, this.password)
    return isMatched
}



const User = mongoose.model('user', userSchema);

module.exports = User