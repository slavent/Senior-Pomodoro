import React from "react"
import axios from "axios"
import { render } from "react-dom"
import { Container, Row, Col, Button, InputGroup, Input } from "reactstrap"
import { remove } from "lodash"
import "bootstrap/dist/css/bootstrap.css"
import "normalize.css"
import "./style.css"

const STATUSES = {
    TODO: "to do",
    IN_PROGRESS: "in progress",
    DONE: "done"
}

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
                            <h4>Your tasks:</h4>
                            <div className="tasks">
                                { tasks.map( ( { _id, title, status }, key ) =>
                                    <div className="tasks__item" key={ key }>
                                        <h6>{ key + 1 }. { title }</h6>
                                        <Button
                                            color={ status === STATUSES.DONE ? "success" : "secondary" }
                                            onClick={ this.onChangeTaskStatus.bind( this, _id ) }>
                                            { status === STATUSES.DONE ? "To do" : "Done" }
                                        </Button>
                                        <span> </span>
                                        <Button
                                            color={ "danger" }
                                            onClick={ this.deleteTask.bind( this, _id ) }>
                                            Delete
                                        </Button>
                                        <span> </span>
                                        <Button
                                            color={ "info" }
                                            onClick={ this.addComment.bind( this, _id ) }>
                                            Add comment
                                        </Button>
                                    </div>
                                ) }
                            </div>
                            <div style={ { textAlign: "center" } }>
                                <InputGroup>
                                    <Input
                                        value={ newTaskTitle }
                                        placeholder="Buy the ticket to theatre"
                                        onChange={ this.onInputTask.bind( this ) }/>
                                </InputGroup>
                                <br/>
                                <Button
                                    color={ "success" }
                                    onClick={ this.addNewTask.bind( this ) }>
                                    Add new task
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <footer></footer>
                </Container>
            </div>
        )
    }
}

render( <App/>, document.getElementById( "app" ) )
