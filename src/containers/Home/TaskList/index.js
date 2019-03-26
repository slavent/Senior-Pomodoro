import React from "react"
import Task from "containers/Home/TaskList/Task"
import { sortTasks } from "containers/Home/utils"
import { connect } from "react-redux"
import { onAddComment, onUpdateTaskStatus, onDeleteTask } from "middlewares"
import { onToggleCommentForm, onStartTask, onToggleComments } from "actions"
import { isEmpty } from "lodash"
import "./style.css"

class TaskList extends React.Component {
    render() {
        const {
            tasks, onToggleCommentForm, onAddComment, onUpdateTaskStatus, onDeleteTask, onStartTask, onToggleComments,
            isShowComments
        } = this.props

        if ( isEmpty( tasks ) ) {
            return <div/>
        }

        return (
            <div className="tasks">
                { sortTasks( tasks ).map( ( item, key ) =>
                    <Task
                        key={ key }
                        { ...item }
                        isShowComments={ isShowComments }
                        onStartTask={ onStartTask }
                        onDeleteTask={ onDeleteTask }
                        onChangeTaskStatus={ onUpdateTaskStatus }
                        onAddComment={ onAddComment }
                        onToggleCommentForm={ onToggleCommentForm }
                        onToggleComments={ onToggleComments }/>
                ) }
                <hr/>
            </div>
        )
    }
}

const actions = {
    onToggleCommentForm, onAddComment, onUpdateTaskStatus, onDeleteTask, onStartTask, onToggleComments
}

export default connect( state => state, actions )( TaskList )
