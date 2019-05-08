import { Reducer } from 'redux'
import { AuthActions, AuthActionTypes } from './AuthActionTypes'

export interface AuthState {
  isLoggingSuccess: boolean
  isLoggingFailed: boolean
  errorMessage: string
  accountFBAccessToken: string
  pageFBAccessToken: string
}

const initialState: AuthState = {
  isLoggingSuccess: false,
  isLoggingFailed: false,
  errorMessage: '',
  accountFBAccessToken: '',
  pageFBAccessToken: ''
}

export const authReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.LOGGING_FAILED:
      return {
        ...initialState,
        isLoggingFailed: true,
        errorMessage: action.payload
      }

    case AuthActionTypes.LOGGING_SUCCESS:
      return {
        ...initialState,
        isLoggingSuccess: true
      }

    default:
      return state
  }
}

export default authReducer
