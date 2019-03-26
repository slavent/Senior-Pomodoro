const mongoose = require( "mongoose" )
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
                    const isEqualIds = !isEmpty( task.comments ) && task.comments[0].toString() === comment._id.toString()

                    if ( isEqualIds ) {
                        task.comments = [comment]
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

exports.getTask = ( { params: { taskId } }, response ) => {
    Tasks.findById( taskId, ( error, task ) => {
        error && response.send( error )

        response.json( task )
    } )
}

exports.updateTask = ( { body, params: { taskId } }, response ) => {
    Tasks.findOneAndUpdate( { _id: taskId }, body, { new: true }, ( error, task ) => {
        error && response.send( error )

        response.json( task )
    } )
}

exports.deleteTask = ( { params: { taskId } }, response ) => {
    Tasks.remove( { _id: taskId }, ( error, task ) => {
        error && response.send( error )

        response.json( { message: "Task successfully deleted" } )
    } )
}
