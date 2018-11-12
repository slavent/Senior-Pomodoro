import React from "react"
import axios from "axios"
import { render } from "react-dom"
import { Container, Row, Col } from "reactstrap"
import { remove, isEmpty, find } from "lodash"
import "bootstrap/dist/css/bootstrap.css"
import "normalize.css"
import "./style.css"
import STATUSES from "constants/TaskFlow"
import AddTaskForm from "./containers/AddTaskForm"
import TaskList from "./containers/TaskList"

class App extends React.Component {
    constructor ( props ) {
        super( props )

        this.state = {
            tasks: [],
            newTaskTitle: ""
        }
    }

    componentDidMount () {
        axios.get( "/api/tasks" ).then( ( { data } ) => {
            this.setState( { tasks: data } )
        } )
    }

    addNewTask () {
        const { newTaskTitle, tasks } = this.state

        axios.post( "/api/tasks", { title: newTaskTitle } ).then( response => {
            tasks.push( response.data )

            this.setState( {
                tasks,
                newTaskTitle: ""
            } )
        } ).catch( error => console.error( error ) )
    }

    deleteTask ( _id ) {
        const { tasks } = this.state

        axios.delete( `/api/tasks/${_id}` ).then( () => {
            remove( tasks, task => task._id === _id )

            this.setState( { tasks } )
        } ).catch( error => console.error( error ) )
    }

    onChangeTaskStatus ( _id ) {
        const { tasks } = this.state
        const taskForChange = tasks.find( task => task._id === _id )
        const isDone = taskForChange.status === STATUSES.DONE

        taskForChange.status = isDone ? STATUSES.TODO : STATUSES.DONE

        axios.put( `/api/tasks/${_id}`, taskForChange ).then( () => {
            const newTasks = tasks.map( task => {
                if ( task._id === taskForChange._id ) {
                    task = taskForChange
                }

                return task
            } )

            this.setState( { tasks: newTasks } )
        } ).catch( error => console.error( error ) )
    }

    onInputTask ( event ) {
        this.setState( { newTaskTitle: event.target.value } )
    }

    addComment ( taskId ) {
        axios.post( `/api/comments`, { text: "some text" } ).then( response => {
            axios.put( `/api/tasks/${taskId}`, { comments: [ response.data._id ] } )
        } ).catch( error => console.error( error ) )

        this.toggleCommentForm( taskId )
    }

    toggleCommentForm ( _id ) {
        const { tasks } = this.state
        const newTasks = tasks.map( task => {
            if ( task._id === _id ) {
                task.isAddComment = !task.isAddComment
            }

            return task
        } )

        this.setState( { tasks: newTasks } )
    }

    render () {
        const { tasks, newTaskTitle } = this.state

        return (
            <div>
                <header>
                    <h2>Todo List App</h2>
                </header>
                <Container className="container">
                    <Row>
                        <Col xs={ 12 }>
                            <TaskList
                                tasks={ tasks }
                                addComment={ this.addComment.bind( this ) }
                                deleteTask={ this.deleteTask.bind( this ) }
                                onChangeTaskStatus={ this.onChangeTaskStatus.bind( this ) }
                                toggleCommentForm={ this.toggleCommentForm.bind( this ) }/>
                            <AddTaskForm
                                newTaskTitle={ newTaskTitle }
                                onAddNewTask={ this.addNewTask.bind( this ) }
                                onInputTask={ this.onInputTask.bind( this ) }/>
                        </Col>
                    </Row>
                    <footer/>
                </Container>
            </div>
        )
    }
}

render( <App/>, document.getElementById( "app" ) )
