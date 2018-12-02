import React from "react"
import Loader from "components/Loader"
import Timer from "components/Timer"
import TaskList from "containers/Home/TaskList"
import AddTaskForm from "containers/Home/AddTaskForm"
import { isEmpty, remove } from "lodash"
import { sortTasks } from "./utils"
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
                        onCreateTask={ createTask }
                        onInputTitle={ inputTaskTitle }
                        onInputEstimate={ inputTaskEstimate }/>
                }
            </div>
        )
    }
}

export default connect( state => state, actions )( Home )
