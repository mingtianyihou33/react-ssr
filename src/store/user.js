import axios from "../plugin/axios";

export function getUsers() {
    return (dispatch) => {
        return axios.get('/api/user/list').then(res => {
            console.log(res)
            dispatch({type: 'push', data: res})
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
