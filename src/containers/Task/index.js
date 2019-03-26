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
        return (
            <Layout>Task's page</Layout>
        )
    }
}

const actions = {
    getTask
}

export default withRouter( connect( state => state, actions )( Task ) )