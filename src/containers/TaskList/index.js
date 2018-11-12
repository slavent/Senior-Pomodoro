import React from "react"
import { Alert, Row, Col, Button } from "reactstrap"
import CommentFrom from "containers/CommentForm"
import ControlButtons from "containers/ControlButtons"
import STATUSES from "constants/TaskFlow"
import { isEmpty } from "lodash"

const TaskList = ( { tasks, toggleCommentForm, addComment, onChangeTaskStatus, deleteTask } ) =>
    <div>
        <h4>Your tasks:</h4>
        <div className="tasks">
            { tasks.map( ( { _id, title, status, comments, isAddComment }, key ) =>
                <Alert
                    key={ key }
                    color={ status === STATUSES.DONE ? "success" : "primary" }
                    style={ { margin: "0 0 20px 0" } }>
                    <Row>
                        <Col xs={ 8 }>
                            <h6>{ key + 1 }. { title }</h6>
                            {
                                !isEmpty( comments ) &&
                                <p className="comments">
                                    { comments.length } { comments.length > 1 ? "comments" : "comment" }
                                </p>
                            }
                            <hr/>
                            {
                                !isAddComment &&
                                <Button
                                    color={ "info" }
                                    onClick={ () => toggleCommentForm( _id ) }>
                                    Add new comment
                                </Button>
                            }
                            {
                                isAddComment &&
                                <CommentFrom onAddComment={ () => addComment( _id ) }/>
                            }
                        </Col>
                        <Col xs={ 4 } style={ { textAlign: "right" } }>
                            <ControlButtons
                                status={ status }
                                onChangeTaskStatus={ () => onChangeTaskStatus( _id ) }
                                onDeleteTask={ () => deleteTask( _id ) }/>
                        </Col>
                    </Row>
                </Alert>
            ) }
        </div>
    </div>

export default TaskList
