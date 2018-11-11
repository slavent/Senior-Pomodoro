const mongoose = require( "mongoose" )
const Users = mongoose.model( "Users" )

exports.getAllUsers = ( request, response ) => {
    Users.find( {}, ( error, users ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( users )
    } )
}

exports.createUser = ( request, response ) => {
    const newUser = new Users( request.body )

    newUser.save( ( error, user ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( user )
    } )
}

exports.getUser = ( request, response ) => {
    Users.findById( request.params.login, ( error, user ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( user )
    } )
}

exports.deleteUser = ( request, response ) => {
    Users.remove( { _id: request.params.userId }, ( error, user ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( { message: "User successfully deleted" } )
    } )
}

exports.updateUser = ( request, response ) => {
    Users.findOneAndUpdate( { _id: request.params.userId }, request.body, { new: true }, ( error, user ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( user )
    } )
}
