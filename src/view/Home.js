import React, {useState} from "react";
import {connect} from 'react-redux'
import {getUsers} from '../store/user'

// @connect(state => ({user: state.user}), {
//     query: () => {
//         return getUsers()
//     }
// })
function Home(props) {
    const [count, setCount] = useState(1)
    return (
        <div>
            <h1>hello, {props.title}</h1>
            <div>{count}</div>
            <ul>
                {props.user.map(item => (<li key={item.username}>名字：{item.username}，年龄：{item.age}</li>))}
            </ul>
            <button onClick={() => setCount(count + 1)}>add</button>
            <button onClick={() => {
                props.getUsers()
            }}>查询
            </button>
        </div>
    )
}

export default connect(state => ({user: state.user}), {
    getUsers
})(Home)
