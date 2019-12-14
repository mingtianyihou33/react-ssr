import React, {useReducer, useState} from 'react'
import {Link} from "react-router-dom";
import routes from "../../router"

export default function Header() {
    return (
        <div>
            {
                routes.map(
                    item => <Link style={{'marginRight': '10px'}} to={item.path} key={item.key}>{item.title}</Link>
                )
            }
        </div>
    )
}
