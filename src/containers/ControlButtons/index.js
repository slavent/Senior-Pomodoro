import React from "react"
import { Button } from "reactstrap"
import STATUSES from "constants/TaskFlow"

const ControlButtons = ( { status, onChangeTaskStatus, onDeleteTask, onStartTask, showStartButton } ) =>
    <div>
        <div style={ { margin: "0 0 10px" } }>
            <Button
                color={ status === STATUSES.DONE ? "secondary" : "success" }
                onClick={ onChangeTaskStatus }>
                { status === STATUSES.DONE ? "Return" : "Done" }
            </Button>
        </div>
        <div style={ { margin: "0 0 10px" } }>
            <Button
                color={ "danger" }
                onClick={ onDeleteTask }>
                Delete
            </Button>
        </div>
        {
            showStartButton &&
            <div style={ { margin: "0 0 10px" } }>
                <Button
                    color={ "primary" }
                    onClick={ onStartTask }>
                    Start
                </Button>
            </div>
        }
    </div>

export default ControlButtons
