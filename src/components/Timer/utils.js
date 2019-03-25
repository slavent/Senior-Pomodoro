export const convertToMs = value => value * 60 * 1000

export const convertMsToTime = value => {
    let milliseconds = value % 1000
    value = ( value - milliseconds ) / 1000
    let seconds = value % 60
    value = ( value - seconds ) / 60
    let minutes = value % 60
    let hours = ( value - minutes ) / 60

    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes
    hours = hours.toString().length === 1 ? "0" + hours : hours

    return hours + ":" + minutes + ":" + seconds
}