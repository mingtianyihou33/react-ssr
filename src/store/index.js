import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './user'
import { userDetailReducer } from './detail'
import { createService } from '../plugin/axios'

const reducer = combineReducers({
  user: userReducer,
  detail: userDetailReducer
})
// const store = createStore(reducer, applyMiddleware(thunk))

export const getClientStore = () => {
  let defaultState = window.__context ? window.__context : {}
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(createService())))
}

export const getServerStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(createService('http://localhost:3001/'))))
}
