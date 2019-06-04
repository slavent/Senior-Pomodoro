import Layout from "components/Layout"
import { getTask } from "middlewares"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class Task extends React.Component {
    componentDidMount() {
        const { getTask, match: { params } } = this.props

        getTask( params.id )
    }

    render() {
        const { currentTask } = this.props

        if ( !currentTask ) {
            return <div/>
        }

        const { title, description, status, priority, estimate, createdDate, comments } = currentTask

        return (
            <Layout>
                <h3>{ title }</h3>
                <p>{ description }</p>
                <ul>
                    <li>Status: { status }</li>
                    <li>Priority: { priority }</li>
                    <li>Estimate: { estimate }</li>
                    <li>Create date: { createdDate }</li>
                    <li>Comments: { comments && comments.length }</li>
                </ul>
            </Layout>
        )
    }
}

const actions = {
    getTask
}

export default withRouter( connect( state => state, actions )( Task ) )