import React from "react"
import { connect } from "react-redux"
import { Input, Row, Col } from "reactstrap"
import PRIORITIES from "constants/priorities"
import { onCreateTask } from "middlewares"
import { onInputDescription, onInputEstimate, onInputPriority, onInputTitle } from "actions"
import "./style.css"

const AddTaskForm = ( { title, description, estimate, priority, onInputEstimate, onInputPriority, onInputTitle, onCreateTask, onInputDescription } ) => {
    const isButtonLock = !title || !priority || !estimate

    return (
        <div>
            <Row>
                <Col xs={ 12 }>
                    <div className="addform">
                        <div className="addform__item">
                            <Input
                                id="input"
                                value={ title }
                                placeholder="Buy tomatoes..."
                                onChange={ onInputTitle }/>
                        </div>
                        <div className="addform__item">
                            <Input
                                style={ { height: 100 } }
                                id="input"
                                type="textarea"
                                value={ description }
                                placeholder="I want..."
                                onChange={ onInputDescription }/>
                        </div>
                        <div className="addform__item">
                            <Input
                                type="select"
                                value={ priority }
                                onChange={ onInputPriority }>
                                <option value={ PRIORITIES.MINOR }>{ PRIORITIES.MINOR }</option>
                                <option value={ PRIORITIES.MAJOR }>{ PRIORITIES.MAJOR }</option>
                                <option value={ PRIORITIES.CRITICAL }>{ PRIORITIES.CRITICAL }</option>
                            </Input>
                        </div>
                        <div className="addform__item">
                            <Input
                                type="select"
                                value={ estimate }
                                onChange={ onInputEstimate }>
                                <option value={ 1 }>1</option>
                                <option value={ 2 }>2</option>
                                <option value={ 3 }>3</option>
                                <option value={ 4 }>4</option>
                                <option value={ 5 }>5</option>
                            </Input>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="addform__wrapper">
                <button
                    disabled={ isButtonLock }
                    className={ "addform__button " + ( isButtonLock ? "addform__button-disabled" : "" ) }
                    onClick={ onCreateTask }>
                    Add task
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => state
const actions = {
    onInputEstimate, onInputPriority, onInputTitle, onInputDescription, onCreateTask
}

export default connect( mapStateToProps, actions )( AddTaskForm )
