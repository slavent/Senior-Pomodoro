const express = require( "express" )
const mongoose = require( "mongoose" )
const Task = require( "./models/todoListModels" )
const bodyParser = require( "body-parser" )
const controller = require("./controllers/todoListController")

const app = express()
const port = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect( "mongodb://localhost/TodoDataBase", { useNewUrlParser: true } )

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
