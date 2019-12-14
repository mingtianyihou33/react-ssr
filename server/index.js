import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter, matchPath, Route} from 'react-router-dom'
import App from '../src/App'
import {Provider} from 'react-redux'
import {getServerStore} from "../src/store";
import routes from '../src/router'
import proxyMiddleWare from 'http-proxy-middleware'

const app = new express()
const store = getServerStore()
app.use(express.static('public'))

// 反向代理
const proxyPath = "http://localhost:3001";//目标后端服务地址
var proxyOption = {
    target: proxyPath,
    changeOrigin: true,
    ws: true
    // pathRewrite: {'^/api': '/'}
};
app.get('/api/*', proxyMiddleWare(proxyOption))

app.get('*', (req, res) => {
    const promises = []
    routes.some(route => {
        const match = matchPath(req.path, route)
        if (match && route.component.loadData) {
            promises.push(route.component.loadData(store))
        }
        return match
    })
    Promise.all(promises).then(() => {
        console.log('store.getState()')
        console.log(store.getState())

        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <App title='app'>
                        {routes.map(route => <Route {...route}></Route>)}
                    </App>
                </StaticRouter>
            </Provider>
        )
        res.send(
            `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.__context=${JSON.stringify(store.getState())}
                    </script>
                    <script src="bundle.js"></script>
                </body>
            </html>
        `
        )
    })
})


app.listen(3000, () => {
    console.log('http://localhost:3000/')
})
