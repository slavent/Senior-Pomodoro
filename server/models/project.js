const mongoose = require( "mongoose" )
const Schema = mongoose.Schema

ProjectSchema = new Schema( {
    name: {
        type: String
    },
    description: {
        type: String
    },
    members: []
} )

module.exports = mongoose.model( "Projects", ProjectSchema )
