import React from "react"
import STATUSES from "constants/statuses"
import CommentFrom from "containers/Home/TaskList/index"
import ToolBar from "containers/Home/TaskList/ToolBar"
import { createCommentString, getTimeFromISO, getTitleClassName } from "containers/Home/TaskList/utils"
import { isEmpty } from "lodash"
import { Col, Row } from "reactstrap"

const Task = (
    {
        _id, title, status, comments, isAddComment, estimate, onToggleCommentForm, onAddComment, onChangeTaskStatus,
        onDeleteTask, onStartTask, onToggleComments, isShowComments
    }
) =>
    <div className={ "tasks__item " + ( status === STATUSES.DONE && "tasks__item-done" ) }>
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
                           className={ "comments__toggler " + ( isShowComments ? "comments__toggler-selected" : "" ) }
                           onClick={ () => onToggleComments() }>
                            { comments.length } { createCommentString( comments ) }
                        </a>
                        <div className="comments__wrapper">
                            {
                                isShowComments ? comments.map( ( { date, text }, key ) =>
                                    <div className="comments__item" key={ key }>
                                        <div className="comments__date">{ getTimeFromISO( date ) }</div>
                                        <div className="comments__content">{ text }</div>
                                    </div>
                                ) : ""
                            }
                        </div>
                    </div>
                }
                { isAddComment && <CommentFrom onAddComment={ () => onAddComment( _id ) }/> }
            </Col>
            <div className="tasks__buttons">
                <ToolBar
                    status={ status }
                    showStartButton={ Number( estimate ) > 0 }
                    onToggleCommentForm={ () => onToggleCommentForm( _id ) }
                    onChangeTaskStatus={ () => onChangeTaskStatus( _id ) }
                    onDeleteTask={ () => onDeleteTask( _id ) }
                    onStartTask={ () => onStartTask( _id, estimate ) }/>
            </div>
        </Row>
    </div>

export default Task