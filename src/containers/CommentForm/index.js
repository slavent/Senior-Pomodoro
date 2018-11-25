import React from "react"
import { Input, Button } from "reactstrap"
import "./style.css"

export default ( { onAddComment } ) =>
    <div className="commentform">
        <div className="commentform__item">
            <Input type="textarea" placeholder="Your comment for this task..."/>
        </div>
        <div className="commentform__item">
            <Button className="float-right" color={ "info" } onClick={ onAddComment }> Add</Button>
        </div>
    </div>
