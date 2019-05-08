import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import authReducer, { AuthState } from '../Auth/authReducer'

export interface AppState {
  auth: AuthState
}

const rootReducer = combineReducers<AppState>({
  auth: authReducer
})

export default function configureStore(): Store<AppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
  return store
}
