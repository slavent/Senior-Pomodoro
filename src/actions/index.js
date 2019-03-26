import {
    CANCEL_TIMER, CLEAR_ADD_TASK_FORM, DISABLE_LOADING, ENABLE_LOADING,
    INPUT_TASK_ESTIMATE, INPUT_TASK_PRIORITY,
    INPUT_TASK_TITLE,
    START_TASK,
    TOGGLE_COMMENT_FORM,
    TOGGLE_COMMENTS
} from "constants/actions"

export const startTask = taskId => ( {
    type: START_TASK,
    payload: taskId
} )

export const cancelTimer = () => ( {
    type: CANCEL_TIMER
} )

export const toggleCommentForm = taskId => ( {
    type: TOGGLE_COMMENT_FORM,
    payload: taskId
} )

export const toggleComments = () => ( {
    type: TOGGLE_COMMENTS
} )

export const inputTaskTitle = event => ( {
    type: INPUT_TASK_TITLE,
    payload: event.target.value
} )

export const inputTaskEstimate = event => ( {
    type: INPUT_TASK_ESTIMATE,
    payload: event.target.value
} )

export const inputTaskPriority = event => ( {
    type: INPUT_TASK_PRIORITY,
    payload: event.target.value
} )

export const clearAddTaskForm = () => ( {
    type: CLEAR_ADD_TASK_FORM
} )

export const disableLoading = () => ( {
    type: DISABLE_LOADING
} )

export const enableLoading = () => ( {
    type: ENABLE_LOADING
} )