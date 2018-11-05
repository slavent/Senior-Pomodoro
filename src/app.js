import React from "react"
import axios from "axios"
import { render } from "react-dom"
import { Container, Row, Col, Button } from "reactstrap"
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
            <div>
                <header></header>
                <Container fluid={ true }>
                    <Row>
                        <Col xs={ 12 }>
                            <h4>Your tasks:</h4>
                            <div className="tasks">
                                { tasks.map( ( { title }, key ) =>
                                    <div className="tasks__item" key={ key }>
                                        <h6>{ key + 1 }. { title } <input type="checkbox"/></h6>
                                    </div>
                                ) }
                            </div>
                            <Button color={ "danger" } className="float-right">Add new task</Button>
                        </Col>
                    </Row>
                    <footer></footer>
                </Container>
            </div>
        )
    }
}

render( <App/>, document.getElementById( "app" ) )
