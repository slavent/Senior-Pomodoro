import React from "react"
import { Input, Button, Row, Col } from "reactstrap"

const AddTaskForm = ( { title, estimate, onInputTask, onAddNewTask, onInputEstimate } ) =>
    <div style={ { textAlign: "center" } }>
        <Row>
            <Col xs={ 12 }>
                <label>Task:</label>
                <Input
                    type="textarea"
                    value={ title }
                    placeholder="Your new task..."
                    onChange={ onInputTask }/>
            </Col>
            <Col xs={ 12 }>
                <label>Estimate:</label>
                <Input
                    type="textarea"
                    value={ estimate }
                    placeholder="0"
                    onChange={ onInputEstimate }/>
            </Col>
        </Row>
        <br/>
        <Button
            color={ "success" }
            onClick={ onAddNewTask }>
            Add new task
        </Button>
    </div>

export default AddTaskForm
