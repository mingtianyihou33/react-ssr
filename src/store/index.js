import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {userReducer} from './user'

const reducer = combineReducers({
    user: userReducer
})
// const store = createStore(reducer, applyMiddleware(thunk))

export const getClientStore = () => {
    let defaultState = window.__context ? window.__context : {}
    return createStore(reducer, defaultState, applyMiddleware(thunk))
}

export const getServerStore = () => {
    return createStore(reducer, applyMiddleware(thunk))
}
