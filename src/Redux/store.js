
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import googleUsers from './googleUsers'

const rootReducer = combineReducers({

    google: googleUsers
})

export default function generateStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}
