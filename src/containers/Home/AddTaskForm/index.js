import React from "react"
import { connect } from "react-redux"
import { Input, Row, Col } from "reactstrap"
import PRIORITIES from "constants/priorities"
import { inputTaskEstimate, inputTaskPriority, inputTaskTitle, createTask } from "actions"
import "./style.css"

const AddTaskForm = ( { title, estimate, priority, inputTaskEstimate, inputTaskPriority, inputTaskTitle, createTask } ) =>
    <div>
        <Row>
            <Col xs={ 12 }>
                <div className="addform">
                    <div className="addform__item">
                        <Input
                            style={ { height: 100 } }
                            id="input"
                            type="textarea"
                            value={ title }
                            placeholder="Buy tomatoes..."
                            onChange={ inputTaskTitle }/>
                    </div>
                    <div className="addform__item">
                        <Input
                            type="select"
                            value={ priority }
                            onChange={ inputTaskPriority }>
                            <option>{ PRIORITIES.MINOR }</option>
                            <option>{ PRIORITIES.MAJOR }</option>
                            <option>{ PRIORITIES.CRITICAL }</option>
                        </Input>
                    </div>
                    <div className="addform__item">
                        <Input
                            type="select"
                            value={ estimate }
                            onChange={ inputTaskEstimate }>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </div>
                </div>
            </Col>
        </Row>
        <div className="addform__wrapper">
            <button
                className="addform__button"
                onClick={ createTask }>
                Add task
            </button>
        </div>
    </div>

const mapStateToProps = state => state
const actions = {
    inputTaskEstimate, inputTaskPriority, inputTaskTitle, createTask
}

export default connect( mapStateToProps, actions )( AddTaskForm )
