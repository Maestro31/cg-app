export enum TeamActionTypes {
  LOADING = 'LOADING',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  ERROR = 'ERROR',
  REMOVE_SUCCESS = 'REMOVE_SUCCESS'
}

interface LoadingAction {
  type: TeamActionTypes.LOADING
}

interface SuccessAction {
  type: TeamActionTypes.FETCH_SUCCESS
  payload: any
}

interface ErrorAction {
  type: TeamActionTypes.ERROR
  payload: string
}

interface RemoveSuccessAction {
  type: TeamActionTypes.REMOVE_SUCCESS
  payload: string
}

export type TeamActions = LoadingAction | SuccessAction | ErrorAction
