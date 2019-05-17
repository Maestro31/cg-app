import { Reducer } from 'redux'
import { TeamActions, TeamActionTypes } from './TeamActionTypes'

export interface TeamState {
  isLoading: boolean
  teams: { [key in string]: Team } | null
  errorMessage: string
}

const initialState: TeamState = {
  isLoading: false,
  teams: null,
  errorMessage: ''
}

export const teamReducer: Reducer<TeamState, TeamActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TeamActionTypes.LOADING:
      return {
        ...initialState,
        isLoading: true
      }
    case TeamActionTypes.FETCH_SUCCESS:
      return {
        ...initialState,
        teams: action.payload
      }
    case TeamActionTypes.ERROR:
      return {
        ...initialState,
        errorMessage: action.payload
      }
    // case TeamActionTypes.REMOVE_SUCCESS:
    //   return {
    //     ...state,
    //     errorMessage: '',
    //     teams: state.teams.filter(team => team.)
    //   }

    default:
      return state
  }
}

export default teamReducer
