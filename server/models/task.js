const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

SettingsSchema = new Schema( {
    title: {
        type: String,
        required: "Task's title is required."
    },
    description: {
        type: String
    },
    estimate: {
        type: Number,
        required: "Task's estimation is required.",
        default: 0
    },
    priority: {
        type: String,
        enum: [ "minor", "major", "critical" ],
        default: "minor"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    finishedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: [ "to do", "in progress", "done" ],
        default: "to do"
    },
    comments: []
} )

module.exports = mongoose.model( "Tasks", SettingsSchema )
