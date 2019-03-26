import axios from "axios"
import {
    CANCEL_TIMER, CLEAR_ADD_TASK_FORM, DISABLE_LOADING, ENABLE_LOADING,
    GET_TASKS, INPUT_TASK_ESTIMATE, INPUT_TASK_PRIORITY, INPUT_TASK_TITLE,
    START_TASK,
    TOGGLE_COMMENT_FORM,
    TOGGLE_COMMENTS,
    UPDATE_TASK
} from "constants/actions"
import STATUSES from "constants/statuses"

const API_PATH = "/api/tasks"

export const getTasks = () => dispatch => {
    dispatch( enableLoading() )

    axios.get( API_PATH ).then( ( { data } ) => {
        dispatch( {
            type: GET_TASKS,
            payload: data
        } )

        dispatch( disableLoading() )
    } )
}

export const createTask = () => ( dispatch, getState ) => {
    const { title, estimate, priority } = getState()

    axios.post( API_PATH, {
        title,
        estimate,
        priority
    } ).then( ( { data } ) => {
        dispatch( getTasks() )
    } ).catch( error => console.error( error ) )

    dispatch( clearAddTaskForm() )
}

export const deleteTask = id => dispatch => {
    axios.delete( API_PATH + "/" + id ).then( () => {
        dispatch( getTasks() )
    } ).catch( error => console.error( error ) )
}

export const finishTask = () => ( dispatch, getState ) => {
    const { startedTaskId, tasks } = getState()
    const task = tasks.find( task => task._id === startedTaskId )

    task.estimate = task.estimate - 1

    if ( task.estimate === 0 ) {
        task.status = STATUSES.DONE
    }

    dispatch( updateTask( task ) )
}

export const updateTask = task => dispatch => {
    axios.put( API_PATH + "/" + task._id, task ).then( () => {
        dispatch( {
            type: UPDATE_TASK,
            payload: task
        } )
    } ).catch( error => console.error( error ) )
}

export const updateTaskStatus = id => ( dispatch, getState ) => {
    const { tasks } = getState()
    const task = tasks.find( task => task._id === id )
    const isDone = task.status === STATUSES.DONE

    task.status = isDone ? STATUSES.TODO : STATUSES.DONE

    dispatch( updateTask( task ) )
}

export const addComment = taskId => dispatch => {
    axios.post( `/api/comments`, { text: "some text" } ).then( ( { data } ) => {
        axios.put( API_PATH + "/" + taskId, { comments: [data._id] } )
    } ).catch( error => console.error( error ) )

    dispatch( toggleCommentForm( taskId ) )
}

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
