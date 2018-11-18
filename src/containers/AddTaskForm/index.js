import React from "react"
import { Input, Button, Row, Col, Label } from "reactstrap"

const AddTaskForm = ( { title, estimate, onInputTask, onAddNewTask, onInputEstimate } ) =>
    <div>
        <Row>
            <Col xs={ 12 }>
                <div style={{ margin: "auto", width: 400 }}>
                    <div style={ { margin: "0 0 20px" } }>
                        <Label for="input">Task</Label>
                        <Input
                            style={ { height: 100 } }
                            id="input"
                            type="textarea"
                            value={ title }
                            placeholder="Your new task..."
                            onChange={ onInputTask }/>
                    </div>
                    <div>
                        <Label for="select">Estimate</Label>
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
        <br/>
        <div style={ { textAlign: "center" } }>
            <Button
                color={ "success" }
                onClick={ onAddNewTask }>
                Add new task
            </Button>
        </div>
    </div>

export default AddTaskForm
