import React from "react"
import Loader from "components/Loader"
import Timer from "components/Timer"
import TaskList from "containers/Home/TaskList"
import AddTaskForm from "containers/Home/AddTaskForm"
import { connect } from "react-redux"
import { getTasks } from "middlewares"

class Home extends React.Component {
    componentDidMount() {
        this.props.getTasks()
    }

    render() {
        const { isLoading, timerIsOn } = this.props

        if ( isLoading ) {
            return <Loader/>
        }

        return (
            <div>
                {
                    timerIsOn
                        ? <Timer/>
                        : <div>
                            <TaskList/>
                            <AddTaskForm/>
                        </div>
                }
            </div>
        )
    }
}

const actions = { getTasks }

export default connect( state => state, actions )( Home )
