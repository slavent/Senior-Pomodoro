import React from "react"

const POMODORO_INTERVAL = 0.2

export default class Timer extends React.Component {
    constructor ( props ) {
        super( props )

        this.state = {
            time: convertToMs( POMODORO_INTERVAL ),
            isOn: props.isOn || false
        }

        this.startTimer = this.startTimer.bind( this )
        this.stopTimer = this.stopTimer.bind( this )
        this.resetTimer = this.resetTimer.bind( this )
    }

    startTimer () {
        this.timer = setInterval( () => {
            if ( Number( this.state.time ) === 0 ) {
                this.stopTimer()

                return
            }

            this.setState( {
                time: this.state.time - 1000
            } )
        }, 1000 )
    }

    stopTimer () {
        this.setState( { isOn: false } )

        clearInterval( this.timer )
    }

    resetTimer () {
        this.setState( {
            time: 0,
            isOn: false
        } )
    }

    render () {
        return <h3>{ convertMsToTime( this.state.time ) }</h3>
    }
}

const convertToMs = value => value * 60 * 1000

const convertMsToTime = value => {
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
