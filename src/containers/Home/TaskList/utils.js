import STATUSES from "constants/statuses"

export const createCommentString = comments => comments.length > 1 ? "comments" : "comment"

export const getTitleClassName = status => "tasks__title " + ( status === STATUSES.DONE ? "tasks__title-through" : "" )

export const getTimeFromISO = ISO => {
    const milliseconds = Date.parse( ISO )
    const date = new Date( milliseconds )
    const timeString = date.getHours() + ":" + date.getMinutes()
    const dateString = date.getDate() + "." + date.getMonth() + "." + date.getFullYear()

    return timeString + ", " + dateString
}