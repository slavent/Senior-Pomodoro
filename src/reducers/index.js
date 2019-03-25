import TYPES from "constants/actions"
import { remove } from "lodash"

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
        case TYPES.GET_TASKS:
            return {
                ...state,
                tasks: payload,
                isLoading: false
            }

        case TYPES.CREATE_TASK: {
            const { tasks } = state

            tasks.push( payload )

            return {
                ...state,
                tasks
            }
        }

        case TYPES.DELETE_TASK: {
            const { tasks } = state

            remove( tasks, task => task._id === payload )

            return {
                ...state,
                tasks
            }
        }

        case TYPES.FINISH_TASK:
            return {
                ...state,
                timerIsOn: false,
                startedTaskId: null
            }

        case TYPES.START_TASK:
            return {
                ...state,
                timerIsOn: true,
                startedTaskId: payload
            }

        case TYPES.CANCEL_TIMER:
            return {
                ...state,
                timerIsOn: false,
                startedTaskId: null
            }

        case TYPES.UPDATE_TASK: {
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

        case TYPES.TOGGLE_COMMENT_FORM: {
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

        case TYPES.TOGGLE_COMMENTS:
            return {
                ...state,
                showComments: !state.showComments
            }

        case TYPES.INPUT_TASK_TITLE:
            return {
                ...state,
                title: payload
            }

        case TYPES.INPUT_TASK_ESTIMATE:
            return {
                ...state,
                estimate: payload
            }

        case TYPES.INPUT_TASK_PRIORITY:
            return {
                ...state,
                priority: payload
            }

        default:
            return state
    }
}
