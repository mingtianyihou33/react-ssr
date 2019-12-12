import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import Home from './view/Home'
import About from './view/About'

function App(props) {
    return (
        <div>
            <Route path="/" exact>
                <Home title={props.title}/>
            </Route>
            <Route path="/about" exact>
                <About/>
            </Route>
        </div>
    )
}

export default <App title="app"></App>
