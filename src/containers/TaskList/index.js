import React from "react"
import { Alert, Row, Col } from "reactstrap"
import CommentFrom from "containers/CommentForm"
import ControlButtons from "containers/ControlButtons"
import STATUSES from "constants/TaskFlow"
import { isEmpty } from "lodash"
import "./style.css"

export default ( { tasks, toggleCommentForm, addComment, onChangeTaskStatus, deleteTask, onStartTask, toggleComments, showComments } ) =>
    <div className="tasks">
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

const getTimeFromISO = ISO => {
    const milliseconds = Date.parse( ISO )
    const date = new Date( milliseconds )
    const timeString = date.getHours() + ":" + date.getMinutes()
    const dateString = date.getDate() + "." + date.getMonth() + "." + date.getFullYear()

    return timeString + ", " + dateString
}
