import React from 'react'
import ReactDom from 'react-dom'
import App from '../src/App'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '../src/router'
import { getClientStore } from '../src/store'

const store = getClientStore()
const Page = (
  <Provider store={store}>
    <BrowserRouter>
      <App title='app'>
        <Switch>
          {routes.map(route => <Route {...route}></Route>)}
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
)
if (window.__context) {
  ReactDom.hydrate(Page, document.getElementById('root'))
} else {
  ReactDom.render(Page, document.getElementById('root'))
}

