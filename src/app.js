import React from "react"
import axios from "axios"
import { render } from "react-dom"
import { Container, Row, Col, Card, CardTitle } from "reactstrap"

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
            <Container>
                <Row>
                    <Col xs={ 12 }>
                        { tasks.map( ( { title }, key ) =>
                            <Card key={ key }>
                                <CardTitle>
                                    { title }
                                </CardTitle>
                            </Card>
                        ) }
                    </Col>
                </Row>
            </Container>
        )
    }
}

render( <App/>, document.getElementById( "app" ) )
