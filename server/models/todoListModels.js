const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

TaskSchema = new Schema( {
    title: {
        type: String,
        required: "Task's name is required."
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: [ "to do", "in progress", "done" ],
        default: "to do"
    }
} )

module.exports = mongoose.model( "Tasks", TaskSchema )
