import React from "react"
import { Input, Row, Col } from "reactstrap"
import PRIORITIES from "constants/priorities"
import "./style.css"

export default ( { title, estimate, priority, onInputTitle, onInputPriority, onCreateTask, onInputEstimate } ) =>
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
                            onChange={ onInputTitle }/>
                    </div>
                    <div className="addform__item">
                        <Input
                            type="select"
                            value={ priority }
                            onChange={ onInputPriority }>
                            <option>{ PRIORITIES.MINOR }</option>
                            <option>{ PRIORITIES.MAJOR }</option>
                            <option>{ PRIORITIES.CRITICAL }</option>
                        </Input>
                    </div>
                    <div className="addform__item">
                        <Input
                            type="select"
                            value={ estimate }
                            onChange={ onInputEstimate }>
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
                onClick={ onCreateTask }>
                Add task
            </button>
        </div>
    </div>
