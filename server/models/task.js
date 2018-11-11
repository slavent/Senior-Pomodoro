const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

TaskSchema = new Schema( {
    title: {
        type: String,
        required: "Task's title is required."
    },
    description: {
        type: String
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

module.exports = mongoose.model( "Tasks", TaskSchema )
