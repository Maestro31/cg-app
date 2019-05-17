import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { database } from '../../service/Firebase'
import { AppState } from '../reducers'
import { TeamActions, TeamActionTypes } from './TeamActionTypes'

type TeamAction = ActionCreator<
  ThunkAction<Promise<any>, AppState, null, TeamActions>
>

const sendError = (error: Error) => ({
  type: TeamActionTypes.ERROR,
  payload: error.message
})

const sendSuccess = (teams: any) => ({
  type: TeamActionTypes.FETCH_SUCCESS,
  payload: teams
})

export const getTeamsByOwner: TeamAction = (uid: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const teamsRef = database.ref('/teams')
      teamsRef
        .orderByChild('owner')
        .equalTo(uid)
        .once('value')
        .then(data => {
          dispatch(sendSuccess(data.val()))
        })
    } catch (e) {
      dispatch(sendError(e))
    }
  }
}

export const removeTeam: TeamAction = (uid: string) => {
  return async (dispatch: Dispatch, getState) => {
    try {
      await database
        .ref('/teams')
        .child(uid)
        .remove()

      let teams = getState().team.teams
      teams && delete teams[uid]
      dispatch(sendSuccess(teams))
    } catch (e) {
      dispatch(sendError(e))
    }
  }
}
