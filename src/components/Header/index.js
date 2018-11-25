import React from "react"
import Menu from "components/Menu"
import "./style.css"

export default () =>
    <header>
        <h2>
            <a href="/">
                <div className="logo"/>
                Senior Pomodoro
            </a>
        </h2>
        <Menu/>
    </header>
