import React from "react"
import { convertMsToTime, convertToMs } from "components/Timer/utils"
import { connect } from "react-redux"
import { onFinishTask } from "middlewares"
import { onCancelTimer } from "actions"
import "./style.css"

const INTERVAL = 10

class Timer extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            time: convertToMs( INTERVAL ),
            isOn: props.timerIsOn || false
        }

        this.onStart = this.onStart.bind( this )
        this.onStop = this.onStop.bind( this )
        this.onClose = this.onClose.bind( this )

        props.timerIsOn && this.onStart()
    }

    onStart() {
        this.timer = setInterval( () => {
            if ( Number( this.state.time ) === 0 ) {
                this.onStop()
                this.props.onFinishTask()

                return
            }

            this.setState( {
                time: this.state.time - 1000
            } )
        }, 1000 )
    }

    onStop() {
        this.setState( { isOn: false } )

        clearInterval( this.timer )
    }

    onClose() {
        const { onCancelTimer } = this.props

        this.onStop()
        onCancelTimer && onCancelTimer()
    }

    render() {
        return (
            <div className="timer">
                <hr/>
                <p className="timer__time">{ convertMsToTime( this.state.time ) }</p>
                <div className="timer__close" onClick={ this.onClose }/>
            </div>
        )
    }
}

const actions = { onCancelTimer, onFinishTask }

export default connect( state => state, actions )( Timer )
