const mongoose = require( "mongoose" )
const commentController = require( "./commentController" )
const Tasks = mongoose.model( "Tasks" )
const Comments = mongoose.model( "Comments" )
const { isEmpty } = require( "lodash" )

exports.getAllTasks = ( request, response ) => {
    Tasks.find( {}, ( error, tasks ) => {
        error && response.send( error )

        Comments.find( {}, ( error, comments ) => {
            error && response.send( error )

            tasks.forEach( task => {
                !isEmpty( comments ) && comments.forEach( comment => {
                    const isEqualIds = !isEmpty( task.comments ) && task.comments[ 0 ].toString() === comment._id.toString()

                    if ( isEqualIds ) {
                        task.comments = [ comment ]
                    }
                } )
            } )

            response.json( tasks )
        } )
    } )
}

exports.createTask = ( request, response ) => {
    const newTask = new Tasks( request.body )

    newTask.save( ( error, task ) => {
        error && response.send( error )

        response.json( task )
    } )
}

exports.getTask = ( request, response ) => {
    Tasks.findById( request.params.taskId, ( error, task ) => {
        error && response.send( error )

        const comments = commentController.getTaskComments( request.params.taskId )

        task.comments = comments

        response.json( task )
    } )
}

exports.updateTask = ( request, response ) => {
    Tasks.findOneAndUpdate( { _id: request.params.taskId }, request.body, { new: true }, ( error, task ) => {
        error && response.send( error )

        response.json( task )
    } )
}

exports.deleteTask = ( request, response ) => {
    Tasks.remove( { _id: request.params.taskId }, ( error, task ) => {
        error && response.send( error )

        response.json( { message: "Task successfully deleted" } )
    } )
}
