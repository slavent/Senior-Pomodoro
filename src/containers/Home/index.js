import React from "react"
import Loader from "components/Loader"
import Timer from "components/Timer"
import TaskList from "containers/Home/TaskList"
import AddTaskForm from "containers/Home/AddTaskForm"
import { isEmpty, remove } from "lodash"
import axios from "axios"
import STATUSES from "constants/statuses"
import PRIORITIES from "constants/priorities"

const API_PATH = "/api/tasks"

export default class Home extends React.Component {
    constructor ( props ) {
        super( props )

        this.state = {
            tasks: [],
            title: "",
            estimate: 1,
            priority: "",
            timerIsOn: false,
            startedTaskId: null,
            isLoading: true,
            showComments: false
        }
    }

    componentDidMount () {
        axios.get( API_PATH ).then( ( { data } ) => {
            this.setState( {
                tasks: data,
                isLoading: false
            } )
        } )
    }

    toggleComments () {
        this.setState( { showComments: !this.state.showComments } )
    }

    addNewTask () {
        const { title, estimate, tasks } = this.state

        axios.post( API_PATH, {
            title,
            estimate
        } ).then( response => {
            tasks.push( response.data )

            this.setState( {
                tasks,
                title: "",
                estimate: "",
                priority: ""
            } )
        } ).catch( error => console.error( error ) )
    }

    deleteTask ( _id ) {
        const { tasks } = this.state

        axios.delete( API_PATH + "/" + _id ).then( () => {
            remove( tasks, task => task._id === _id )

            this.setState( { tasks } )
        } ).catch( error => console.error( error ) )
    }

    onChangeTaskStatus ( _id ) {
        const { tasks } = this.state
        const taskForChange = tasks.find( task => task._id === _id )
        const isDone = taskForChange.status === STATUSES.DONE

        taskForChange.status = isDone ? STATUSES.TODO : STATUSES.DONE

        axios.put( API_PATH + "/" + _id, taskForChange ).then( () => {
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
            axios.put( API_PATH + "/" + taskId, { comments: [ response.data._id ] } )
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

                    if ( task.estimate === 0 ) {
                        task.status = STATUSES.DONE
                    }

                    axios.put( API_PATH + "/" + task._id, task ).catch( error => console.error( error ) )
                }

                return task
            } ),
            timerIsOn: false,
            startedTaskId: null
        } )
    }

    cancelTimer () {
        this.setState( {
            timerIsOn: false,
            startedTaskId: null
        } )
    }

    onInputPriority ( event ) {
        this.setState( { priority: event.target.value } )
    }

    render () {
        const { tasks, title, estimate, priority, timerIsOn, isLoading, showComments } = this.state
        const isTaskListRender = !isLoading && !timerIsOn && !isEmpty( tasks )
        const isAddFormRender = !isLoading && !timerIsOn

        return (
            <div>
                { isLoading && <Loader/> }
                {
                    timerIsOn &&
                    <Timer
                        isOn={ timerIsOn }
                        cancelTimer={ this.cancelTimer.bind( this ) }
                        onDone={ this.onTimerDone.bind( this ) }/>
                }
                {
                    isTaskListRender &&
                    <TaskList
                        tasks={ sortTasks( tasks ) }
                        showComments={ showComments }
                        toggleComments={ this.toggleComments.bind( this ) }
                        addComment={ this.addComment.bind( this ) }
                        deleteTask={ this.deleteTask.bind( this ) }
                        onChangeTaskStatus={ this.onChangeTaskStatus.bind( this ) }
                        toggleCommentForm={ this.toggleCommentForm.bind( this ) }
                        onStartTask={ this.onStartTask.bind( this ) }/>
                }
                {
                    isAddFormRender &&
                    <AddTaskForm
                        title={ title }
                        estimate={ estimate }
                        priority={ priority }
                        onInputPriority={ this.onInputPriority.bind( this ) }
                        onAddNewTask={ this.addNewTask.bind( this ) }
                        onInputTask={ this.onInputTask.bind( this ) }
                        onInputEstimate={ this.onInputEstimate.bind( this ) }/>
                }
            </div>
        )
    }
}

const sortTasks = tasks => sortTasksByPriority( sortTasksByStatus( tasks ) )

const sortTasksByStatus = tasks => tasks.sort( ( task1, task2 ) => {
    if ( task1.status === STATUSES.TODO && task2.status === STATUSES.DONE ) {
        return -1
    }

    if ( task1.status === STATUSES.DONE && task2.status === STATUSES.TODO ) {
        return 1
    }

    if ( task1.status === STATUSES.TODO && task2.status === STATUSES.TODO ) {
        return 0
    }

    if ( task1.status === STATUSES.DONE && task2.status === STATUSES.DONE ) {
        return 0
    }
} )

const sortTasksByPriority = tasks => tasks.sort( ( task1, task2 ) => {
    if ( task1.priority === PRIORITIES.MINOR && task2.priority === PRIORITIES.MAJOR ) {
        return -1
    }

    if ( task1.priority === PRIORITIES.MINOR && task2.priority === PRIORITIES.CRITICAL ) {
        return -1
    }

    if ( task1.priority === PRIORITIES.MAJOR && task2.priority === PRIORITIES.CRITICAL ) {
        return -1
    }

    if ( task1.priority === PRIORITIES.MINOR && task2.priority === PRIORITIES.MINOR ) {
        return 0
    }

    if ( task1.priority === PRIORITIES.MAJOR && task2.priority === PRIORITIES.MAJOR ) {
        return 0
    }

    if ( task1.priority === PRIORITIES.CRITICAL && task2.priority === PRIORITIES.CRITICAL ) {
        return 0
    }
} )

