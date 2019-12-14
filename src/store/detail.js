import axios from "../plugin/axios";

export function getUserDetail() {
    return (dispatch) => {
        console.log('detail')
        return axios.get('/api/user/detail1').then(res => {
            console.log('detail', res)
            dispatch({type: 'addDetail', data: res})
        })
    }
}

export function userDetailReducer(state = {}, action) {
    if (action.type === 'addDetail') {
        return action.data
    } else {
        return state
    }
}
