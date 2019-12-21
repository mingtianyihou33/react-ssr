import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../store/user'
import styles from './Home.css'
import WithStyle from '../WithStyle'
// @connect(state => ({user: state.user}), {
//     query: () => {
//         return getUsers()
//     }
// })
function Home (props) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (!props.user.length) {
      props.getUsers()
    }
    console.log('Home componentDidMount')
    return () => {
      console.log('Home componentWillUnmount')
    }
  }, [])
  return (
    <div>
      <h1>hello, {props.title}</h1>
      <div>{count}</div>
      <ul className={styles.list}>
        {props.user.map(item => <li className={styles.listItem}
                                    key={item.username}>名字：{item.username}，年龄：{item.age}</li>)}
      </ul>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

Home.loadData = (store) => {
  return store.dispatch(getUsers())
}
export default connect(state => ({ user: state.user }), {
  getUsers
})(WithStyle(Home, styles))
