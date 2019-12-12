import axios from "axios";

export function getUsers() {
    return (dispatch) => {
        axios.get('/api/user/list').then(res => {
            res = res.data
            if (res.code === 200) {
                dispatch({type: 'push', data: res.data})
            }
        })
    }
}

export function userReducer(state = [], action) {
    console.log(action)
    if (action.type === 'push') {
        return action.data
    } else {
        return state
    }
}
