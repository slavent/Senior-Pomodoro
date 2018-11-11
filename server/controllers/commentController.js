const mongoose = require( "mongoose" )
const Comments = mongoose.model( "Comments" )
const Tasks = mongoose.model( "Tasks" )

exports.getAllComments = ( request, response ) => {
    Comments.find( {}, ( error, comments ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( comments )
    } )
}

exports.getUserComments = ( request, response ) => {

}

exports.getTaskComments = taskId => {
    const taskComments = []

    Tasks.find( { _id: taskId }, ( error, task ) => {
        if ( error ) {
            response.send( error )
        }

        task.comments.forEach( commentId => {
            Comments.find( { _id: commentId }, ( error, comment ) => {
                if ( error ) {
                    response.send( error )
                }

                taskComments.push( comment )
            } )
        } )

        response.json( taskComments )
    } )
}

exports.getComment = ( request, response ) => {
    Comments.findById( request.params.commentId, ( error, comment ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( comment )
    } )
}

exports.createComment = ( request, response ) => {
    const newComment = new Comments( request.body )

    newComment.save( ( error, comment ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( comment )
    } )
}

exports.deleteComment = ( request, response ) => {
    Comments.remove( { _id: request.params.commentId }, ( error, comment ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( { message: "Comment successfully deleted" } )
    } )
}

exports.updateComment = ( request, response ) => {
    Comments.findOneAndUpdate( { _id: request.params.commentId }, request.body, { new: true }, ( error, comment ) => {
        if ( error ) {
            response.send( error )
        }

        response.json( comment )
    } )
}
