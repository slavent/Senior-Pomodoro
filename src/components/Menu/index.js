import React from "react"
import { Link } from "react-router-dom"
import "./style.css"

export default class Menu extends React.Component {
    constructor ( props ) {
        super( props )

        this.state = {
            show: false
        }
    }

    toggle () {
        this.setState( { show: !this.state.show } )
    }

    render () {
        const { show } = this.state

        return (
            <div className="menu">
                <div className="menu__icon" onClick={ this.toggle.bind( this ) }/>
                {
                    show &&
                    <div className="menu__wrapper">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/reg">Registration</Link></li>
                            <li><Link to="/auth">Authorization</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                }
            </div>
        )
    }
}
