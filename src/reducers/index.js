import {
    CANCEL_TIMER, CLEAR_ADD_TASK_FORM,
    FINISH_TASK,
    GET_TASKS, INPUT_TASK_ESTIMATE, INPUT_TASK_PRIORITY, INPUT_TASK_TITLE,
    START_TASK,
    TOGGLE_COMMENT_FORM, TOGGLE_COMMENTS,
    UPDATE_TASK
} from "constants/actions"

const initialState = {
    tasks: [],
    title: "",
    estimate: 1,
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
                isLoading: false
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

        case INPUT_TASK_TITLE:
            return {
                ...state,
                title: payload
            }

        case INPUT_TASK_ESTIMATE:
            return {
                ...state,
                estimate: payload
            }

        case INPUT_TASK_PRIORITY:
            return {
                ...state,
                priority: payload
            }

        case CLEAR_ADD_TASK_FORM:
            return {
                ...state,
                title: "",
                priority: "",
                estimate: ""
            }

        default:
            return state
    }
}
