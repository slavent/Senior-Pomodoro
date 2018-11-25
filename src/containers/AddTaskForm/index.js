import React from "react"
import { Input, Row, Col, Label } from "reactstrap"
import "./style.css"

export default ( { title, estimate, onInputTask, onAddNewTask, onInputEstimate } ) =>
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
                            onChange={ onInputTask }/>
                    </div>
                    <div className="addform__item">
                        <Input
                            value={ estimate }
                            type="select"
                            id="select"
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
                onClick={ onAddNewTask }>
                Add task
            </button>
        </div>
    </div>
