import React from "react"
import axios from "axios"
import { render } from "react-dom"
import { Container, Row, Col } from "reactstrap"
import { remove, isEmpty, find } from "lodash"
import STATUSES from "constants/TaskFlow"
import AddTaskForm from "containers/AddTaskForm"
import TaskList from "containers/TaskList"
import "bootstrap/dist/css/bootstrap.css"
import "normalize.css"
import "./style.css"
import Timer from "components/Timer"

class App extends React.Component {
    constructor ( props ) {
        super( props )

        this.state = {
            tasks: [],
            title: "",
            estimate: "",
            timerIsOn: false,
            startedTaskId: null
        }
    }

    componentDidMount () {
        axios.get( "/api/tasks" ).then( ( { data } ) => {
            this.setState( { tasks: data } )
        } )
    }

    addNewTask () {
        const { title, estimate, tasks } = this.state

        axios.post( "/api/tasks", {
            title,
            estimate
        } ).then( response => {
            tasks.push( response.data )

            this.setState( {
                tasks,
                title: "",
                estimate: ""
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
        this.setState( { title: event.target.value } )
    }

    onInputEstimate ( event ) {
        this.setState( { estimate: event.target.value } )
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

    onStartTask ( _id ) {
        this.setState( {
            timerIsOn: true,
            startedTaskId: _id
        } )
    }

    onTimerDone () {
        const { tasks, startedTaskId } = this.state

        this.setState( {
            tasks: tasks.map( task => {
                if ( task._id === startedTaskId ) {
                    task.estimate = task.estimate - 1
                    axios.put( `/api/tasks/${task._id}`, task ).catch( error => console.error( error ) )
                }

                return task
            } )
        } )
    }

    render () {
        const { tasks, title, estimate, timerIsOn } = this.state

        return (
            <div>
                <header>
                    <h2>Todo List App</h2>
                </header>
                <Container className="container">
                    <Row>
                        <Col xs={ 12 }>
                            {
                                timerIsOn &&
                                <Timer
                                    isOn={ timerIsOn }
                                    onDone={ this.onTimerDone.bind( this ) }/>
                            }
                            <TaskList
                                tasks={ tasks }
                                addComment={ this.addComment.bind( this ) }
                                deleteTask={ this.deleteTask.bind( this ) }
                                onChangeTaskStatus={ this.onChangeTaskStatus.bind( this ) }
                                toggleCommentForm={ this.toggleCommentForm.bind( this ) }
                                onStartTask={ this.onStartTask.bind( this ) }/>
                            <AddTaskForm
                                title={ title }
                                estimate={ estimate }
                                onAddNewTask={ this.addNewTask.bind( this ) }
                                onInputTask={ this.onInputTask.bind( this ) }
                                onInputEstimate={ this.onInputEstimate.bind( this ) }/>
                        </Col>
                    </Row>
                    <footer/>
                </Container>
            </div>
        )
    }
}

render( <App/>, document.getElementById( "app" ) )
