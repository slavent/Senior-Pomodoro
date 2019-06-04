import React from "react"
import Menu from "components/Menu"
import "./style.css"
import { Link } from "react-router-dom"

const Header = () =>
    <header>
        <h2>
            <Link to={ "/" }>
                <div className="logo"/>
                Senior Pomodoro
            </Link>
        </h2>
        <Menu/>
    </header>

export default Header
