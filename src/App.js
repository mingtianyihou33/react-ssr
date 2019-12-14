import React, {useReducer, useState} from 'react'
import {Route} from 'react-router-dom'
import Home from './view/Home'
import About from './view/About'
import Header from './components/Header/Header'

function App(props) {
    const headerComponent = <Header/>
    const [header, setHeader] = useState(headerComponent)

    function toggleHeader() {
        let val = header ? '' : headerComponent
        setHeader(val)
    }

    return (
        <div>
            {header}
            <button onClick={toggleHeader}>
                {header ? 'hidden' : 'show'}
            </button>
            {props.children}
        </div>
    )
}

export default App
