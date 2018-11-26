const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

CommandSchema = new Schema( {
    name: {
        type: String
    },
    description: {
        type: String
    },
    members: []
} )

module.exports = mongoose.model( "Commands", CommandSchema )
