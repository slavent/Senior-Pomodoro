import { onClearAddingForm, disableLoading, enableLoading, onToggleCommentForm } from "actions"
import axios from "axios"
import {
    GET_TASKS,
    ON_UPDATE_TASK
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

export const onCreateTask = () => ( dispatch, getState ) => {
    const { title, estimate, priority } = getState()

    axios.post( API_PATH, {
        title,
        estimate,
        priority
    } ).then( ( { data } ) => {
        dispatch( getTasks() )
    } ).catch( error => console.error( error ) )

    dispatch( onClearAddingForm() )
}

export const onDeleteTask = id => dispatch => {
    axios.delete( API_PATH + "/" + id ).then( () => {
        dispatch( getTasks() )
    } ).catch( error => console.error( error ) )
}

export const onFinishTask = () => ( dispatch, getState ) => {
    const { startedTaskId, tasks } = getState()
    const task = tasks.find( task => task._id === startedTaskId )

    task.estimate = task.estimate - 1

    if ( task.estimate === 0 ) {
        task.status = STATUSES.DONE
    }

    dispatch( onUpdateTask( task ) )
}

export const onUpdateTask = task => dispatch => {
    axios.put( API_PATH + "/" + task._id, task ).then( () => {
        dispatch( {
            type: ON_UPDATE_TASK,
            payload: task
        } )
    } ).catch( error => console.error( error ) )
}

export const onUpdateTaskStatus = id => ( dispatch, getState ) => {
    const { tasks } = getState()
    const task = tasks.find( task => task._id === id )
    const isDone = task.status === STATUSES.DONE

    task.status = isDone ? STATUSES.TODO : STATUSES.DONE

    dispatch( onUpdateTask( task ) )
}

export const onAddComment = taskId => dispatch => {
    axios.post( `/api/comments`, { text: "some text" } ).then( ( { data } ) => {
        axios.put( API_PATH + "/" + taskId, { comments: [data._id] } )
    } ).catch( error => console.error( error ) )

    dispatch( onToggleCommentForm( taskId ) )
}
