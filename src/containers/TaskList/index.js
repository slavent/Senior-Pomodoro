import React from "react"
import { Alert, Row, Col } from "reactstrap"
import CommentFrom from "containers/CommentForm"
import ControlButtons from "containers/ControlButtons"
import STATUSES from "constants/TaskFlow"
import { isEmpty } from "lodash"
import "./style.css"

export default ( { tasks, toggleCommentForm, addComment, onChangeTaskStatus, deleteTask, onStartTask } ) =>
    <div className="tasks">
        <h4>Your tasks:</h4>
        <div className="tasks__wrapper">
            { tasks.map( ( { _id, title, status, comments, isAddComment, estimate }, key ) =>
                <div className="tasks__item">
                    <Alert key={ key } color={ status === STATUSES.DONE ? "success" : "primary" }>
                        <Row>
                            <Col xs={ 10 }>
                                <p className={ getTitleClassName( status ) }>{ title }</p>
                                {
                                    status === STATUSES.TODO && estimate > 0 &&
                                    <p className="tasks__estimate">
                                        Estimate: { estimate } x <span className="tomato"/>
                                    </p>
                                }
                                {
                                    status === STATUSES.TODO && !isEmpty( comments ) &&
                                    <p className="tasks__comments">
                                        { comments.length } { createCommentString( comments ) }</p>
                                }
                                { isAddComment && <CommentFrom onAddComment={ () => addComment( _id ) }/> }
                            </Col>
                            <Col xs={ 2 } className="tasks__buttons">
                                <ControlButtons
                                    status={ status }
                                    showStartButton={ Number( estimate ) > 0 }
                                    onToggleCommentForm={ () => toggleCommentForm( _id ) }
                                    onChangeTaskStatus={ () => onChangeTaskStatus( _id ) }
                                    onDeleteTask={ () => deleteTask( _id ) }
                                    onStartTask={ () => onStartTask( _id, estimate ) }/>
                            </Col>
                        </Row>
                    </Alert>
                </div>
            ) }
            <hr/>
        </div>
    </div>

const createCommentString = comments => comments.length > 1 ? "comments" : "comment"

const getTitleClassName = status => "tasks__title " + ( status === STATUSES.DONE ? "tasks__title-through" : "" )
