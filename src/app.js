import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import { remove, isEmpty, find } from "lodash"
import Header from "components/Header"
import Footer from "components/Footer"
import Home from "containers/Home"
import Registration from "containers/Registration"
import Authorization from "containers/Authorization"
import About from "containers/About"
import "bootstrap/dist/css/bootstrap.css"
import "normalize.css"
import "./style.css"

class App extends React.Component {
    render () {
        return (
            <div>
                <Router>
                    <div>
                        <Header/>
                        <Container className="container">
                            <Row>
                                <Col xs={ 12 }>
                                    <Route exact path="/" component={ Home }/>
                                    <Route path="/reg" component={ Registration }/>
                                    <Route path="/auth" component={ Authorization }/>
                                    <Route path="/about" component={ About }/>
                                </Col>
                            </Row>
                            <Footer/>
                        </Container>
                    </div>
                </Router>
            </div>
        )
    }
}

render( <App/>, document.getElementById( "app" ) )
