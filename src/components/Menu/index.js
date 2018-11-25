import React from "react"
import { Link } from "react-router-dom"
import "./style.css"

export default () =>
    <div className="menu">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reg">Registration</Link></li>
            <li><Link to="/auth">Authorization</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </div>
