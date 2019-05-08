export enum AuthActionTypes {
  LOGGING_SUCCESS = 'LOGGING_SUCCESS',
  LOGGING_FAILED = 'LOGGING_FAILED'
}

interface LoggingSuccessAction {
  type: AuthActionTypes.LOGGING_SUCCESS
  payload: {
    fbAccessToken: string
    pageFBAccessToken: string
  }
}

interface LoggingFailedAction {
  type: AuthActionTypes.LOGGING_FAILED
  payload: string
}

export type AuthActions = LoggingSuccessAction | LoggingFailedAction
