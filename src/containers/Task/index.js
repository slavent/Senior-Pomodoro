import React from "react"
import { withRouter } from "react-router-dom"

class Task extends React.Component {
    render() {
        console.log( this.props )

        return (
            <div>Task's page</div>
        )
    }
}

export default withRouter( Task )