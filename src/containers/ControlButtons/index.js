import React from "react"
import STATUSES from "constants/TaskFlow"
import "./style.css"

const ControlButtons = ( { status, onChangeTaskStatus, onDeleteTask, onStartTask, showStartButton } ) =>
    <div>
        {
            status === STATUSES.TODO && showStartButton &&
            <div style={ {
                margin: "0 0 10px",
                textAlign: "right"
            } }>
                <div className="ctrl-button ctrl-button-start" onClick={ onStartTask }/>
            </div>
        }
        <div style={ { margin: "0 0 10px" } }>
            <div
                className={ "ctrl-button ctrl-button-" + ( status === STATUSES.DONE ? "return" : "done" ) }
                onClick={ onChangeTaskStatus }/>
        </div>
        <div style={ {
            margin: "10px 0",
            textAlign: "right"
        } }>
            <div className="ctrl-button ctrl-button-delete" onClick={ onDeleteTask }/>
        </div>
    </div>

export default ControlButtons
