import React from 'react'
import ReactDom from 'react-dom'
import App from '../src/App'
import {BrowserRouter, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import routes from "../src/router";
import {getClientStore} from "../src/store";

const store = getClientStore()
const Page = (
    <Provider store={store}>
        <BrowserRouter>
            <App title='app'>
                {routes.map(route => <Route {...route}></Route>)}
            </App>
        </BrowserRouter>
    </Provider>
)
ReactDom.hydrate(Page, document.getElementById('root'))
