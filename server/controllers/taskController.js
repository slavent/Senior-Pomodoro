const mongoose = require( "mongoose" )
const Tasks = mongoose.model( "Tasks" )

exports.getAllTasks = ( request, response ) => {
    Tasks.find( {}, ( error, tasks ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( tasks )
    } )
}

exports.createTask = ( request, response ) => {
    const newTask = new Tasks( request.body )

    newTask.save( ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( task )
    } )
}

exports.getTask = ( request, response ) => {
    Tasks.findById( request.params.taskId, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( task )
    } )
}

exports.updateTask = ( request, response ) => {
    Tasks.findOneAndUpdate( { _id: request.params.taskId }, request.body, { new: true }, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( task )
    } )
}

exports.deleteTask = ( request, response ) => {
    Tasks.remove( { _id: request.params.taskId }, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( { message: "Task successfully deleted" } )
    } )
}
