import PRIORITIES from "constants/priorities"
import STATUSES from "constants/statuses"

export const sortTasks = tasks => sortTasksByPriority( sortTasksByStatus( tasks ) )

const sortTasksByStatus = tasks => tasks.sort( ( task1, task2 ) => {
    if ( task1.status === STATUSES.TODO && task2.status === STATUSES.DONE ) {
        return -1
    }

    if ( task1.status === STATUSES.DONE && task2.status === STATUSES.TODO ) {
        return 1
    }

    if ( task1.status === STATUSES.TODO && task2.status === STATUSES.TODO ) {
        return 0
    }

    if ( task1.status === STATUSES.DONE && task2.status === STATUSES.DONE ) {
        return 0
    }
} )

const sortTasksByPriority = tasks => tasks.sort( ( task1, task2 ) => {
    if ( task1.priority === PRIORITIES.MINOR && task2.priority === PRIORITIES.MAJOR ) {
        return -1
    }

    if ( task1.priority === PRIORITIES.MINOR && task2.priority === PRIORITIES.CRITICAL ) {
        return -1
    }

    if ( task1.priority === PRIORITIES.MAJOR && task2.priority === PRIORITIES.CRITICAL ) {
        return -1
    }

    if ( task1.priority === PRIORITIES.MINOR && task2.priority === PRIORITIES.MINOR ) {
        return 0
    }

    if ( task1.priority === PRIORITIES.MAJOR && task2.priority === PRIORITIES.MAJOR ) {
        return 0
    }

    if ( task1.priority === PRIORITIES.CRITICAL && task2.priority === PRIORITIES.CRITICAL ) {
        return 0
    }
} )
