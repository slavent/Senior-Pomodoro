import React from "react"
import { Col, Row, Label, Input } from "reactstrap"
import "./style.css"

export default class Authorization extends React.Component {
    render () {
        return (
            <Row>
                <Col xs={ 12 }>
                    <div className="auth">
                        <div className="auth__item">
                            <label>Username</label>
                            <Input type="text"/>
                        </div>
                        <div className="auth__item">
                            <label>Password</label>
                            <Input type="password"/>
                        </div>
                        <div className="auth__item">
                            <button className="auth__button">Authorize</button>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}
