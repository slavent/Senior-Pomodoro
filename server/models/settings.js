const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

SettingsSchema = new Schema( {
    pomodoroInterval: {
        type: Number,
        default: 25
    }
} )

module.exports = mongoose.model( "Settings", SettingsSchema )
