import React from "react"
import STATUSES from "constants/statuses"
import CommentFrom from "containers/Home/TaskList/index"
import ToolBar from "containers/Home/TaskList/ToolBar"
import { createCommentString, getTimeFromISO, getTitleClassName } from "containers/Home/TaskList/utils"
import { isEmpty } from "lodash"
import { Col, Row } from "reactstrap"

const Task = (
    {
        _id, title, status, comments, isAddComment, estimate, toggleCommentForm, addComment, onChangeTaskStatus,
        deleteTask, onStartTask, toggleComments, showComments
    }
) =>
    <div key={ key } className={ "tasks__item " + ( status === STATUSES.DONE && "tasks__item-done" ) }>
        <Row>
            <Col xs={ 12 }>
                <p className={ getTitleClassName( status ) }>{ title }</p>
                {
                    status === STATUSES.TODO && estimate > 0 &&
                    <p className="tasks__estimate">
                        Estimate: { estimate } x <span className="tomato"/>
                    </p>
                }
                {
                    status === STATUSES.TODO && !isEmpty( comments ) &&
                    <div className="comments">
                        <a href="#"
                           className={ "comments__toggler " + ( showComments ? "comments__toggler-selected" : "" ) }
                           onClick={ () => toggleComments() }>
                            { comments.length } { createCommentString( comments ) }
                        </a>
                        <div className="comments__wrapper">
                            {
                                showComments ? comments.map( ( { date, text }, key ) =>
                                    <div className="comments__item" key={ key }>
                                        <div className="comments__date">{ getTimeFromISO( date ) }</div>
                                        <div className="comments__content">{ text }</div>
                                    </div>
                                ) : ""
                            }
                        </div>
                    </div>
                }
                { isAddComment && <CommentFrom onAddComment={ () => addComment( _id ) }/> }
            </Col>
            <div className="tasks__buttons">
                <ToolBar
                    status={ status }
                    showStartButton={ Number( estimate ) > 0 }
                    onToggleCommentForm={ () => toggleCommentForm( _id ) }
                    onChangeTaskStatus={ () => onChangeTaskStatus( _id ) }
                    onDeleteTask={ () => deleteTask( _id ) }
                    onStartTask={ () => onStartTask( _id, estimate ) }/>
            </div>
        </Row>
    </div>

export default Task