import React from "react"
import Loader from "components/Loader"
import Timer from "components/Timer"
import TaskList from "containers/Home/TaskList"
import AddTaskForm from "containers/Home/AddTaskForm"
import { isEmpty } from "lodash"
import { sortTasks } from "./utils"
import { connect } from "react-redux"
import * as actions from "actions"

class Home extends React.Component {
    componentDidMount() {
        this.props.getTasks()
    }

    render() {
        const {
            tasks, isLoading, timerIsOn, deleteTask, updateTaskStatus, startTask,
            showComments, toggleCommentForm, addComment, toggleComments
        } = this.props

        if ( isLoading ) {
            return <Loader/>
        }

        return (
            <div>
                { timerIsOn && <Timer/> }
                {
                    !timerIsOn && !isEmpty( tasks ) &&
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
                { !timerIsOn && <AddTaskForm/> }
            </div>
        )
    }
}

const mapStateToProps = state => ( {
    tasks: state.tasks,
    isLoading: state.isLoading,
    timerIsOn: state.timerIsOn
} )

export default connect( mapStateToProps, actions )( Home )
