const mongoose = require( "mongoose" )
const Task = mongoose.model( "Tasks" )

exports.getAllTasks = ( request, response ) => {
    Task.find( {}, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( task )
    } )
}

exports.createTask = ( request, response ) => {
    const newTask = new Task( request.body )

    newTask.save( ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( task )
    } )
}

exports.getTask = ( request, response ) => {
    Task.findById( request.params.taskId, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( task )
    } )
}

exports.updateTask = ( request, response ) => {
    Task.findOneAndUpdate( { _id: request.params.taskId }, request.body, { new: true }, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( task )
    } )
}

exports.deleteTask = ( request, response ) => {
    Task.remove( { _id: request.params.taskId }, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( { message: "Task successfully deleted" } )
    } )
}
