export function getUsers () {
  return (dispatch, getState, axios) => {
    console.log('user')
    return axios.get('/api/user/list').then(res => {
      console.log(res)
      dispatch({ type: 'push', data: res })
    })
  }
}

export function userReducer (state = [], action) {
  if (action.type === 'push') {
    return action.data
  } else {
    return state
  }
}
