import React from "react"
import Task from "containers/Home/TaskList/Task"
import { sortTasks } from "containers/Home/utils"
import { connect } from "react-redux"
import * as actions from "actions"
import { isEmpty } from "lodash"
import "./style.css"

class TaskList extends React.Component {
    componentDidMount() {
        this.props.getTasks()
    }

    render() {
        const {
            tasks, toggleCommentForm, addComment, onChangeTaskStatus, deleteTask, onStartTask, toggleComments,
            showComments
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
                        toggleCommentForm={ toggleCommentForm }
                        addComment={ addComment }
                        onChangeTaskStatus={ onChangeTaskStatus }
                        deleteTask={ deleteTask }
                        onStartTask={ onStartTask }
                        toggleComments={ toggleComments }
                        showComments={ showComments }/>
                ) }
                <hr/>
            </div>
        )
    }
}

export default connect( state => state, actions )( TaskList )
