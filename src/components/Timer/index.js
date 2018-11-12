import React from "react"

export default class Timer extends React.Component {
    constructor ( props ) {
        super( props )
        this.state = {
            time: 0,
            isOn: false,
            start: 0
        }

        this.startTimer = this.startTimer.bind( this )
        this.stopTimer = this.stopTimer.bind( this )
        this.resetTimer = this.resetTimer.bind( this )
    }

    startTimer () {
        this.setState( {
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        } )

        this.timer = setInterval( () => this.setState( {
            time: Date.now() - this.state.start
        } ), 1 )
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
        let start = ( this.state.time == 0 ) ?
            <button onClick={ this.startTimer }>start</button> :
            null
        let stop = ( this.state.time == 0 || !this.state.isOn ) ?
            null :
            <button onClick={ this.stopTimer }>stop</button>
        let resume = ( this.state.time == 0 || this.state.isOn ) ?
            null :
            <button onClick={ this.startTimer }>resume</button>
        let reset = ( this.state.time == 0 || this.state.isOn ) ?
            null :
            <button onClick={ this.resetTimer }>reset</button>
        return (
            <div>
                <h3>timer: { convertMsToTime( this.state.time ) }</h3>
                { start }
                { resume }
                { stop }
                { reset }
            </div>
        )
    }
}

const convertMsToTime =  value => {
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
