import React from "react"
import "./style.css"

export default () =>
    <footer>
        <hr/>
        <p>
            Created by <a href="mailto:startupne@gmail.com">Slavent</a>.
            <span> </span>
            { new Date().getYear() + 1900 }
        </p>
    </footer>
