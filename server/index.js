import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import App from '../src/App'
import {Provider} from 'react-redux'
import store from "../src/store";

const app = new express()
app.use(express.static('public'))

app.get('/api/user/list', (req, res) => {
    res.json({code: 200, data: [{username: 'zhangsan', age: 12},{username: 'lisi', age: 22}]})
})

app.get('*', (req, res) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                {App}
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
                <script src="bundle.js"></script>
            </body>
        </html>
    `)
})


app.listen(3000, () => {
    console.log('http://localhost:3000/')
})
