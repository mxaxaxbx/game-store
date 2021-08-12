const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const moment   = require('moment');

const userSchema = new mongoose.Schema({
    name        : { type : String, required : true },
    email       : { type : String, required : true },
    password    : { type : String, required : true },
    date        : { type : Date, default : Date.now() },
    status      : { type : Boolean, required: true },
});

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            _id  : this.id,
            name : this.name,
            iat  : moment().unix(),
        },
        process.env.SECRET_KEY_JWT
    )
}

const user = mongoose.model("user",  userSchema);

module.exports = user;
