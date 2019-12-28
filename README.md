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
### 7. css支持
- 在服务端webpack配置添加css-loader
- 在客户端webpack配置添加style-loader和css-loader
- 客户端打包后生成的js文件将会执行将css添加到style标签内
- isomorphic-style-loader可以不用添加
***
### 8. css支持
- 在服务端webpack配置添加css-loader
- 在客户端webpack配置添加style-loader和css-loader
- 客户端打包后生成的js文件将会执行将css添加到style标签内
- isomorphic-style-loader可以不用添加
***
### 9. 404页面
- 在服务端StaticRouter中添加context
- 添加一个默认匹配路由NotFound
- 在NotFound中添加Status，Status中包含Router组件，并render函数中获取staticContext,在服务端渲染时staticContext将会有值，
  给staticContext设置code值
- 在服务端接口输出部分通过判断context的code值，然后返回相应的状态码和404界面
### 10. 服务端重定向
- 添加重定向页面，并在里面添加Redirect组件
- 在服务端接口输出部分可以通过context.action === 'REPLACE'来判断是否是重定向，如果是则直接返回301状态码和要跳到的地址
### 11. 从ssr降级到csr
- 添加html-webpack-plugin到客服端webpack的plugins中，然后添加html模版
- 在服务端通过参数或者内容使用情况，如果符合条件，则直接返回为csr内容，不进行服务端渲染
- 在客户端判断是ssr还是csr决定使用hydrate还是render
### 12. css模块
- 将客户端和服务端的css-loader配置module设置为true
- 服务端添加isomorphic-style-loader，该loader将为style模块添加_getCss等方法，可以通过将_getCss获取到的css添加到context中，最后将css部分插入到html的style标签中
- 服务端在context中添加css属性，方便路由组件设置css到上下文中
### 13. css使用高阶组件优化
- 添加WithStyle组件,WithStyle组件用于包裹其他要引入样式的组件，方便push css到context上
### 14. 使用WithStyle后服务端没有渲染列表数据问题
- 原因：经过过WithStyle包装后，返回的组件丢失了loadData方法
- 解决办法：WithStyle返回的结果要返回之前组件的静态方法，可借助hoist-non-react-statics拷贝所有非react的静态方法
### 15. 其他ssr实现方式
- puppeteer，抓取渲染之后的页面
- prerender
- prerender-spa-plugin
