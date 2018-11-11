const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

UserSchema = new Schema( {
    login: {
        type: String,
        required: "User's login is required"
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        enum: [ "admin", "user" ],
        default: "user"
    },
    tasks: []
} )

module.exports = mongoose.model( "Users", UserSchema )
