import React from "react"
import { InputGroup, Input, Button } from "reactstrap"

const AddTaskForm = ( { newTaskTitle, onInputTask, onAddNewTask } ) =>
    <div style={ { textAlign: "center" } }>
        <InputGroup>
            <Input
                type="textarea"
                value={ newTaskTitle }
                placeholder="Your new task..."
                onChange={ onInputTask }/>
        </InputGroup>
        <br/>
        <Button
            color={ "success" }
            onClick={ onAddNewTask }>
            Add new task
        </Button>
    </div>

export default AddTaskForm
