import { combineReducers, createStore } from 'redhooks'
import thunk from 'redux-thunk'
import authReducer, { AuthState } from '../Auth/authReducer'
import teamReducer, { TeamState } from '../Team/teamReducer'

export interface AppState {
  auth: AuthState
  team: TeamState
}

export const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer
})

const store = createStore(rootReducer, { middlewares: [thunk] })

export default store
