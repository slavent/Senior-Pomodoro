import React from "react"
import { convertMsToTime, convertToMs } from "components/Timer/utils"
import { connect } from "react-redux"
import { cancelTimer, finishTask } from "actions"
import "./style.css"

const POMODORO_INTERVAL = 10

class Timer extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            time: convertToMs( POMODORO_INTERVAL ),
            isOn: props.timerIsOn || false
        }

        this.startTimer = this.startTimer.bind( this )
        this.stopTimer = this.stopTimer.bind( this )
        this.resetTimer = this.resetTimer.bind( this )

        props.timerIsOn && this.startTimer()
    }

    startTimer() {
        this.timer = setInterval( () => {
            if ( Number( this.state.time ) === 0 ) {
                this.stopTimer()
                this.props.finishTask()

                return
            }

            this.setState( {
                time: this.state.time - 1000
            } )
        }, 1000 )
    }

    stopTimer() {
        this.setState( { isOn: false } )

        clearInterval( this.timer )
    }

    resetTimer() {
        this.setState( {
            time: 0,
            isOn: false
        } )
    }

    render() {
        return (
            <div className="timer">
                <hr/>
                <p className="timer__time">{ convertMsToTime( this.state.time ) }</p>
                <div className="timer__close" onClick={ () => this.props.cancelTimer() }/>
            </div>
        )
    }
}

const mapStateToProps = store => store
const actions = { cancelTimer, finishTask }

export default connect( mapStateToProps, actions )( Timer )
