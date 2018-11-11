const express = require( "express" )
const mongoose = require( "mongoose" )
const Task = require( "./models/task" )
const bodyParser = require( "body-parser" )
const controller = require( "./controllers/todoListController" )

const app = express()
const port = process.env.PORT || 3000
const dbPath = "mongodb+srv://slavent:V35CypcmOO0vutjt@cluster0-punqb.azure.mongodb.net/test?retryWrites=true"
const dbLocalPath = "mongodb://localhost/TodoDataBase"

mongoose.Promise = global.Promise
mongoose.connect( dbLocalPath, { useNewUrlParser: true } )

app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )

app.route( "/tasks" )
    .get( controller.getAllTasks )
    .post( controller.createTask )

app.route( "/tasks/:taskId" )
    .get( controller.getTask )
    .put( controller.updateTask )
    .delete( controller.deleteTask )

app.listen( port, () => console.log( "[SERVER]: REST API server started on: " + port ) )
