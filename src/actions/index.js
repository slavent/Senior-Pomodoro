import {
    ON_CANCEL_TIMER, ON_CLEAR_ADDING_FORM, DISABLE_LOADING, ENABLE_LOADING,
    ON_INPUT_ESTIMATE, ON_INPUT_PRIORITY,
    ON_INPUT_TITLE,
    ON_START_TASK,
    ON_TOGGLE_COMMENT_FORM,
    ON_TOGGLE_COMMENTS
} from "constants/actions"

export const onStartTask = taskId => ( {
    type: ON_START_TASK,
    payload: taskId
} )

export const onCancelTimer = () => ( {
    type: ON_CANCEL_TIMER
} )

export const onToggleCommentForm = taskId => ( {
    type: ON_TOGGLE_COMMENT_FORM,
    payload: taskId
} )

export const onToggleComments = () => ( {
    type: ON_TOGGLE_COMMENTS
} )

export const onInputTitle = event => ( {
    type: ON_INPUT_TITLE,
    payload: event.target.value
} )

export const onInputEstimate = event => ( {
    type: ON_INPUT_ESTIMATE,
    payload: event.target.value
} )

export const onInputPriority = event => ( {
    type: ON_INPUT_PRIORITY,
    payload: event.target.value
} )

export const onClearAddingForm = () => ( {
    type: ON_CLEAR_ADDING_FORM
} )

export const disableLoading = () => ( {
    type: DISABLE_LOADING
} )

export const enableLoading = () => ( {
    type: ENABLE_LOADING
} )