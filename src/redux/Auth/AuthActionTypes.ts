export enum AuthActionTypes {
  LOGGING_SUCCESS = 'LOGGING_SUCCESS',
  LOGGING_FAILED = 'LOGGING_FAILED',
  LOADING = 'LOADING',
  DISCONNECT = 'DISCONNECT',
  LINK_ACCOUNT_SUCCESS = 'LINK_ACCOUNT_SUCCESS',
  UNLINK_ACCOUNT_SUCCESS = 'UNLINK_ACCOUNT_SUCCESS'
}

interface LoggingSuccessAction {
  type: AuthActionTypes.LOGGING_SUCCESS
  payload: firebase.User
}

interface LoggingFailedAction {
  type: AuthActionTypes.LOGGING_FAILED
  payload: string
}

interface DisconnectAction {
  type: AuthActionTypes.DISCONNECT
}

interface LoadingAction {
  type: AuthActionTypes.LOADING
}

interface LinkAccountSuccessAction {
  type: AuthActionTypes.LINK_ACCOUNT_SUCCESS,
  payload: firebase.User
}

interface UnLinkAccountSuccessAction {
  type: AuthActionTypes.UNLINK_ACCOUNT_SUCCESS,
  payload: firebase.User
}

export type AuthActions =
  | LoggingSuccessAction
  | LoggingFailedAction
  | DisconnectAction
  | LoadingAction
  | LinkAccountSuccessAction
  | UnLinkAccountSuccessAction
