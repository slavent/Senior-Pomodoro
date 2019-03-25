const express = require( "express" )
const mongoose = require( "mongoose" )
const morgan = require( "morgan" )
const cookieParser = require( "cookie-parser" )
const session = require( "express-session" )
const passport = require( "passport" )
const flash = require( "connect-flash" )
const Task = require( "./models/task" )
const User = require( "./models/user" )
const Comment = require( "./models/comment" )
const Settings = require( "./models/settings" )
const bodyParser = require( "body-parser" )
const userController = require( "./controllers/userController" )
const taskController = require( "./controllers/taskController" )
const commentController = require( "./controllers/commentController" )

const app = express()
const port = process.env.PORT || 3000
const dbPath = "mongodb+srv://slavent:b7cahZoR1hjF4V4U@cluster0-punqb.azure.mongodb.net/test?retryWrites=true"
const dbLocalPath = "mongodb://localhost/TodoDataBase"

mongoose.Promise = global.Promise
mongoose.connect( dbPath, { useNewUrlParser: true } )

app.use( morgan( "dev" ) )
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )
app.use( cookieParser() )
app.use( session( {
    cookie: { maxAge: 60000 },
    secret: "codeworkrsecret",
    saveUninitialized: false,
    resave: false
} ) )
app.use( passport.initialize() )
app.use( passport.session() )
app.use( flash() )
app.use( ( req, res, next ) => {
    res.locals.success_mesages = req.flash( "success" )
    res.locals.error_messages = req.flash( "error" )
    next()
} )

app.route( "/users" )
    .get( userController.getAllUsers )
    .post( userController.createUser )

app.route( "/users/:userId" )
    .get( userController.getUser )
    .put( userController.updateUser )
    .delete( userController.deleteUser )

app.route( "/tasks" )
    .get( taskController.getAllTasks )
    .post( taskController.createTask )

app.route( "/tasks/:taskId" )
    .get( taskController.getTask )
    .put( taskController.updateTask )
    .delete( taskController.deleteTask )

app.route( "/comments" )
    .get( commentController.getAllComments )
    .post( commentController.createComment )

app.route( "/comments/:commentId" )
    .get( commentController.getComment )
    .put( commentController.updateComment )
    .delete( commentController.deleteComment )

app.listen( port, () => console.log( "[SERVER]: REST API server started on: " + port ) )
