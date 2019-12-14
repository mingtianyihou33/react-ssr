# react-ssr
## 服务端渲染要点
### 1. 首屏html内容怎么通过服务端生成，而不是通过js生成？
- 服务端：
    - 页面内容从服务端通过接口返回，通过renderToString，将虚拟dom渲染成html，最后的在把客户端打包后的结果通过script标签引入
- 客户端
    - 客户端主要负责，服务端js内容的生成。将不在通过ReactDom.render()渲染内容。而是通过[ReactDom.hydrate](https://zh-hans.reactjs.org/docs/react-dom.html#hydrate)，对首屏html内容进行补充。
***
### 2. ssr中怎么处理路由问题？（[react-router服务端渲染](https://reacttraining.com/react-router/web/guides/server-rendering)）
- 服务端
    -  使用`<StaticRouter location={req.url}>{入口内容}</StaticRouter>`
- 客户端
    - 使用`<BrowserRouter>{入口内容}</BrowserRouter>`    
***    
### 3. ssr中怎么使用redux？
- 在最外层使用`<Provider store={store}>...</Provider>`进行嵌套
***
### 4. 怎样完成组件内数据服务端渲染？  
- 服务端
    - 通过路由组件定义的loadData方法加载数据后，使服务端的state有值，然后渲染并返回html
    - 为了使客服端初识话后不用再次请求接口数据，可以给渲染出的window，sessionStorage上添加state初始化内容，用于客户端初始化
- 客户端
    - 在store初始化时使用window上服务端设置的数据，避免再次请求接口
***
### 5. 某个组件请求初始化数据失败，不影响整个服务端渲染
- 数据初识化失败是由于promise.all有一个执行失败导致then内容不执行，接口无返回
  可以采用async/await等待所有loadData结束后，返回内容。
***
### 6. 一个后台服务，将接口请求通过服务端代理，解决跨域问题
- 在服务端添加接口拦截指定url前缀的请求，然后代理到目标服务器
***

