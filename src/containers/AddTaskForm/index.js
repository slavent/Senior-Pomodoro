import React from "react"
import { Input, Button, Row, Col, Label } from "reactstrap"
import "./style.css"

export default ( { title, estimate, onInputTask, onAddNewTask, onInputEstimate } ) =>
    <div>
        <Row>
            <Col xs={ 12 }>
                <div className="addform">
                    <div className="addform__item">
                        <Label for="input">Task</Label>
                        <Input
                            style={ { height: 100 } }
                            id="input"
                            type="textarea"
                            value={ title }
                            placeholder="Buy tomatoes..."
                            onChange={ onInputTask }/>
                    </div>
                    <div className="addform__item">
                        <Label for="select">Tomato estimate</Label>
                        <Input
                            value={ estimate }
                            type="select"
                            id="select"
                            onChange={ onInputEstimate }>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </div>
                </div>
            </Col>
        </Row>
        <div className="addform__wrapper">
            <Button
                color={ "success" }
                onClick={ onAddNewTask }>
                Add task
            </Button>
        </div>
    </div>
