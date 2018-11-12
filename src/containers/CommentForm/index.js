import React from "react"
import { Input, Button } from "reactstrap"

const CommentFrom = ( { onAddComment } ) =>
    <div>
        <Input
            type="textarea"
            placeholder="Your comment for this task..."
            style={ { margin: "0 0 10px" } }/>
        <Button
            color={ "info" }
            onClick={ onAddComment }>
            Add
        </Button>
    </div>

export default CommentFrom
