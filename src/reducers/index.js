import {
    CANCEL_TIMER, CLEAR_ADD_TASK_FORM, DISABLE_LOADING, ENABLE_LOADING,
    FINISH_TASK,
    GET_TASKS, ON_INPUT_ESTIMATE, ON_INPUT_PRIORITY, ON_INPUT_TITLE,
    START_TASK,
    TOGGLE_COMMENT_FORM, TOGGLE_COMMENTS,
    UPDATE_TASK
} from "constants/actions"
import PRIORITIES from "constants/priorities"

const initialState = {
    tasks: [],
    title: "",
    estimate: 1,
    priority: PRIORITIES.MINOR,
    timerIsOn: false,
    startedTaskId: null,
    isLoading: true,
    showComments: false
}

export default ( state = initialState, { type, payload } ) => {
    switch ( type ) {
        case GET_TASKS:
            return {
                ...state,
                tasks: payload,
            }

        case FINISH_TASK:
            return {
                ...state,
                timerIsOn: false,
                startedTaskId: null
            }

        case START_TASK:
            return {
                ...state,
                timerIsOn: true,
                startedTaskId: payload
            }

        case CANCEL_TIMER:
            return {
                ...state,
                timerIsOn: false,
                startedTaskId: null
            }

        case UPDATE_TASK: {
            const { tasks } = state

            const newTasks = tasks.map( task => {
                if ( task._id === payload._id ) {
                    task = payload
                }

                return task
            } )

            return {
                ...state,
                tasks: newTasks
            }
        }

        case TOGGLE_COMMENT_FORM: {
            const { tasks } = state
            const newTasks = tasks.map( task => {
                if ( task._id === payload ) {
                    task.isAddComment = !task.isAddComment
                }

                return task
            } )

            return {
                ...state,
                tasks: newTasks
            }
        }

        case TOGGLE_COMMENTS:
            return {
                ...state,
                showComments: !state.showComments
            }

        case ON_INPUT_TITLE:
            return {
                ...state,
                title: payload
            }

        case ON_INPUT_ESTIMATE:
            return {
                ...state,
                estimate: payload
            }

        case ON_INPUT_PRIORITY:
            return {
                ...state,
                priority: payload
            }

        case CLEAR_ADD_TASK_FORM:
            return {
                ...state,
                title: "",
                priority: PRIORITIES.MINOR,
                estimate: 1
            }

        case DISABLE_LOADING:
            return {
                ...state,
                isLoading: false
            }

        case ENABLE_LOADING:
            return {
                ...state,
                isLoading: true
            }

        default:
            return state
    }
}
