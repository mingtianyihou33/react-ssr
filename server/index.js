import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import App from '../src/App'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store'
import routes from '../src/router'
import proxyMiddleWare from 'http-proxy-middleware'

const app = new express()
const store = getServerStore()
app.use(express.static('public'))

// 反向代理
const proxyPath = 'http://localhost:3001'//目标后端服务地址
var proxyOption = {
  target: proxyPath,
  changeOrigin: true,
  ws: true
  // pathRewrite: {'^/api': '/'}
}
app.get('/api/*', proxyMiddleWare(proxyOption))

function csrRender (res) {
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  res.send(html)
  res.end()
}

app.get('*', async (req, res) => {
  if (req.query._mode === 'csr') {
    console.log('csr 渲染')
    return csrRender(res)
  }
  const promises = []
  routes.forEach(route => {
    const match = matchPath(req.path, route)
    if (match && route.component.loadData) {
      promises.push(route.component.loadData(store))
    }
    return match
  })
  for (let i = 0; i < promises.length; i++) {
    try {
      await promises[i]
    } catch (e) {

    }
  }
  console.log('store.getState()')
  console.log(store.getState())
  const context = { css: [] }
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App title='app'>
          <Switch>
            {routes.map(route => <Route {...route}></Route>)}
          </Switch>
        </App>
      </StaticRouter>
    </Provider>
  )
  console.log('context')
  console.log(context)
  if (context.code) {
    res.status(context.code)
  }
  if (context.action === 'REPLACE') {
    res.redirect(301, context.url)
    res.end()
  }
  res.send(
    `
            <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                      ${context.css.join('/n')}
                    </style>
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.__context=${JSON.stringify(store.getState())}
                    </script>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        `
  )
  res.end()
})

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})
