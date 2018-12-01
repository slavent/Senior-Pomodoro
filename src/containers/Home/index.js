import React from "react"
import Loader from "components/Loader"
import Timer from "components/Timer"
import TaskList from "containers/Home/TaskList"
import AddTaskForm from "containers/Home/AddTaskForm"
import { isEmpty, remove } from "lodash"
import STATUSES from "constants/statuses"
import PRIORITIES from "constants/priorities"
import { connect } from "react-redux"
import * as actions from "actions"

class Home extends React.Component {
    componentDidMount () {
        this.props.getTasks()
    }

    render () {
        const {
            title, estimate, priority, tasks, isLoading, timerIsOn, inputTaskTitle, inputTaskEstimate,
            inputTaskPriority, createTask, deleteTask, updateTaskStatus, startTask, cancelTimer, finishTask,
            showComments, toggleCommentForm, addComment, toggleComments
        } = this.props
        const isTaskListRender = !isLoading && !timerIsOn && !isEmpty( tasks )
        const isAddFormRender = !isLoading && !timerIsOn

        return (
            <div>
                { isLoading && <Loader/> }
                {
                    timerIsOn &&
                    <Timer
                        isOn={ timerIsOn }
                        cancelTimer={ cancelTimer }
                        onDone={ finishTask }/>
                }
                {
                    isTaskListRender &&
                    <TaskList
                        tasks={ sortTasks( tasks ) }
                        showComments={ showComments }
                        toggleComments={ toggleComments }
                        addComment={ addComment }
                        deleteTask={ deleteTask }
                        onChangeTaskStatus={ updateTaskStatus }
                        toggleCommentForm={ toggleCommentForm }
                        onStartTask={ startTask }/>
                }
                {
                    isAddFormRender &&
                    <AddTaskForm
                        title={ title }
                        estimate={ estimate }
                        priority={ priority }
                        onInputPriority={ inputTaskPriority }
                        onAddNewTask={ createTask }
                        onInputTask={ inputTaskTitle }
                        onInputEstimate={ inputTaskEstimate }/>
                }
            </div>
        )
    }
}

export default connect( state => state, actions )( Home )

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

