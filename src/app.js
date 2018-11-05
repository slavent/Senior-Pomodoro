import React from "react"
import axios from "axios"
import { render } from "react-dom"
import { Container, Row, Col, Card, Button } from "reactstrap"
import "bootstrap/dist/css/bootstrap.css"
import "normalize.css"
import "./style.css"

class App extends React.Component {
    constructor ( props ) {
        super( props )

        this.state = {
            tasks: []
        }
    }

    componentDidMount () {
        axios.get( "/api/tasks" ).then( ( { data } ) => {
            this.setState( { tasks: data } )
        } )
    }

    render () {
        const { tasks } = this.state

        return (
            <Container fluid={ true }>
                <Row>
                    <Col xs={ 12 }>
                        <h2>Ваши задачи</h2>
                        { tasks.map( ( { title }, key ) =>
                            <Card key={ key }>
                                <h3>{ key + 1 }. { title }</h3>
                            </Card>
                        ) }
                        <Button color={ "danger" }>Add new task</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

render( <App/>, document.getElementById( "app" ) )
