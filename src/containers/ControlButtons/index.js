import React from "react"
import STATUSES from "constants/TaskFlow"
import "./style.css"

export default ( { status, onChangeTaskStatus, onDeleteTask, onStartTask, showStartButton } ) =>
    <div className="controls">
        {
            status === STATUSES.TODO && showStartButton &&
            <div className="controls__item">
                <div className="button button-start" onClick={ onStartTask }/>
            </div>
        }
        <div className="controls__item">
            <div
                className={ "button button-" + ( status === STATUSES.DONE ? "return" : "done" ) }
                onClick={ onChangeTaskStatus }/>
        </div>
        <div className="controls__item">
            <div className="button button-delete" onClick={ onDeleteTask }/>
        </div>
    </div>
