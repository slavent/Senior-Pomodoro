import React from "react"
import STATUSES from "constants/statuses"
import "./style.css"

const ToolBar = ( { status, onChangeTaskStatus, onDeleteTask, onStartTask, showStartButton, onToggleCommentForm } ) =>
    <div className="controls">
        {
            status === STATUSES.TODO && showStartButton &&
            <div className="controls__item">
                <div className="button button-start" onClick={ onStartTask }/>
            </div>

        }
        {
            status === STATUSES.TODO &&
            <div className="controls__item">
                <div className="button button-comment" onClick={ onToggleCommentForm }/>
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

export default ToolBar
