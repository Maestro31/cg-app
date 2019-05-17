import { Reducer } from 'redux'
import { AuthActions, AuthActionTypes } from './AuthActionTypes'

export interface AuthState {
  isLoading: boolean
  errorMessage: string
  accountFBAccessToken: string
  pageFBAccessToken: string
  currentUser: firebase.User | null
}

const initialState: AuthState = {
  isLoading: false,
  currentUser: null,
  errorMessage: '',
  accountFBAccessToken: '',
  pageFBAccessToken: ''
}

export const authReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.LOADING:
      return {
        ...initialState,
        isLoading: true
      }
    case AuthActionTypes.LOGGING_FAILED:
      return {
        ...initialState,
        errorMessage: action.payload
      }

    case AuthActionTypes.LOGGING_SUCCESS:
      return {
        ...initialState,
        isLogged: true,
        currentUser: action.payload
      }

    case AuthActionTypes.DISCONNECT:
      return {
        ...initialState,
        isLoading: false
      }
    case AuthActionTypes.LINK_ACCOUNT_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      }
    case AuthActionTypes.UNLINK_ACCOUNT_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state
  }
}

export default authReducer
