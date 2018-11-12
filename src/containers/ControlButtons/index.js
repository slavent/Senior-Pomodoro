import React from "react"
import { Button } from "reactstrap"
import STATUSES from "constants/TaskFlow"

const ControlButtons = ( { status, onChangeTaskStatus, onDeleteTask } ) =>
    <div>
        <Button
            color={ status === STATUSES.DONE ? "secondary" : "success" }
            onClick={ onChangeTaskStatus }>
            { status === STATUSES.DONE ? "Return" : "Done" }
        </Button>
        <span> </span>
        <Button
            color={ "danger" }
            onClick={ onDeleteTask }>
            Delete
        </Button>
    </div>

export default ControlButtons
