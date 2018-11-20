import TYPES from "constants/actions"

export const createTask = () => ( {
    type: TYPES.CREATE_TASK
} )

export const deleteTask = () => ( {
    type: TYPES.DELETE_TASK
} )

export const finishTask = () => ( {
    type: TYPES.FINISH_TASK
} )

export const startTask = () => ( {
    type: TYPES.START_TASK
} )

export const updateTask = () => ( {
    type: TYPES.UPDATE_TASK
} )

export const sortTasks = () => ( {
    type: TYPES.SORT_TASKS
} )

export const addComment = () => ( {
    type: TYPES.ADD_COMMENT
} )

export const toggleCommentForm = () => ( {
    type: TYPES.TOGGLE_COMMENT_FORM
} )
