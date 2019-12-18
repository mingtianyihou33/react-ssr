export function getUserDetail () {
  return (dispatch, getState, axios) => {
    console.log('detail')
    return axios.get('/api/user/detail').then(res => {
      console.log('detail', res)
      dispatch({ type: 'addDetail', data: res })
    })
  }
}

export function userDetailReducer (state = {}, action) {
  if (action.type === 'addDetail') {
    return action.data
  } else {
    return state
  }
}
