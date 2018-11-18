import React from "react"
import { Alert, Row, Col, Button } from "reactstrap"
import CommentFrom from "containers/CommentForm"
import ControlButtons from "containers/ControlButtons"
import STATUSES from "constants/TaskFlow"
import { isEmpty } from "lodash"

const TaskList = ( { tasks, toggleCommentForm, addComment, onChangeTaskStatus, deleteTask, onStartTask } ) =>
    <div>
        <h4>Your tasks:</h4>
        <div className="tasks">
            { tasks.map( ( { _id, title, status, comments, isAddComment, estimate }, key ) =>
                <Alert
                    key={ key }
                    color={ status === STATUSES.DONE ? "success" : "primary" }
                    style={ { margin: "0 0 20px 0" } }>
                    <Row>
                        <Col xs={ 10 }>
                            <p className="task__title">{ title }</p>
                            {
                                status === STATUSES.TODO && estimate > 0 &&
                                <p className="estimate">Estimated by: { renderTomato( estimate ) } </p>
                            }
                            {
                                status === STATUSES.TODO && !isEmpty( comments ) &&
                                <p className="comments">
                                    { comments.length } { comments.length > 1 ? "comments" : "comment" }
                                </p>
                            }
                            <hr/>
                            {
                                status === STATUSES.TODO && !isAddComment &&
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
                        <Col xs={ 2 } style={ { textAlign: "right" } }>
                            <ControlButtons
                                showStartButton={ Number( estimate ) > 0 }
                                status={ status }
                                onChangeTaskStatus={ () => onChangeTaskStatus( _id ) }
                                onDeleteTask={ () => deleteTask( _id ) }
                                onStartTask={ () => onStartTask( _id, estimate ) }/>
                        </Col>
                    </Row>
                </Alert>
            ) }
        </div>
    </div>

const renderTomato = estimate => {
    const tomato = []

    for ( let index = 0; index < estimate; index++ ) {
        tomato.push( <span className="tomato" key={ index }/> )
    }

    return tomato
}

export default TaskList
