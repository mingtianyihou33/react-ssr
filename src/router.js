import Home from './view/Home'
import About from './view/About'
import Detail from './view/Detail'
import NotFound from './view/NotFound'
import User from './view/User'

export default [
  { title: '首页', key: 1, path: '/home', exact: true, component: Home },
  { title: '关于', key: 2, path: '/about', exact: true, component: About },
  { title: '详情', key: 3, path: '/home/detail', exact: true, component: Detail },
  { title: '用户', key: 4, path: '/user', exact: true, component: User },
  { key: 5, component: NotFound }
]
