import TYPES from "constants/actions"

const initialState = {
    tasks: [],
    title: "",
    estimate: "",
    timerIsOn: false,
    startedTaskId: null,
    isLoading: true
}

export default ( state = initialState, { type, payload } ) => {
    switch ( type ) {
        case TYPES.CREATE_TASK:
            return {
                ...state,
                payload
            }

        case TYPES.DELETE_TASK:
            return {
                ...state,
                payload
            }

        case TYPES.FINISH_TASK:
            return {
                ...state,
                payload
            }

        case TYPES.START_TASK:
            return {
                ...state,
                payload
            }

        case TYPES.UPDATE_TASK:
            return {
                ...state,
                payload
            }

        case TYPES.SORT_TASKS:
            return {
                ...state,
                payload
            }

        case TYPES.ADD_COMMENT:
            return {
                ...state,
                payload
            }

        case TYPES.TOGGLE_COMMENT_FORM:
            return {
                ...state,
                payload
            }

        default:
            return state
    }
}
