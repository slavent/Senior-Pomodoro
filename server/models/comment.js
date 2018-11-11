const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

CommentSchema = new Schema( {
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String
    }
} )

module.exports = mongoose.model( "Comments", CommentSchema )

