import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getAccounts } from '../../service/facebook'
import { database, firebase } from '../../service/firebase'
import { AuthActions, AuthActionTypes } from './AuthActionTypes'
import { AuthState } from './authReducer'

const sendError = (error: any) => ({
  type: AuthActionTypes.LOGGING_FAILED,
  payload: error.message
})

const sendLoginSuccess = () => ({
  type: AuthActionTypes.LOGGING_SUCCESS
})

const signInWithPopup = async (provider: firebase.auth.AuthProvider) => {
  const userData: firebase.auth.UserCredential = await firebase
    .auth()
    .signInWithPopup(provider)

  return userData
}

export const createAccount: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthActions>
> = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userData: firebase.auth.UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      if (userData.user) {
        database.ref(`users/${userData.user.uid}`).set({
          email: userData.user.email,
          providerId: userData.user.providerId
        })
      }

      dispatch(sendLoginSuccess())
    } catch (error) {
      dispatch(sendError(error))
      console.error(error)
    }
  }
}

export const facebookLogin: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthActions>
> = () => {
  return async (dispatch: Dispatch) => {
    let provider = new firebase.auth.FacebookAuthProvider()

    provider.addScope('public_profile')
    provider.addScope('email')
    provider.addScope('manage_pages')

    try {
      const userData = await signInWithPopup(provider)
      if (userData.credential)
        localStorage.setItem('FBaccess_token', userData.credential.accessToken)

      dispatch(sendLoginSuccess())
    } catch (error) {
      dispatch(sendError(error))
      console.error(error)
    }

    try {
      const data = await getAccounts()
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }
}

export const twitterLogin: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthActions>
> = () => {
  return async (dispatch: Dispatch) => {
    let provider = new firebase.auth.TwitterAuthProvider()

    try {
      const userData = await signInWithPopup(provider)
      if (userData.credential)
        localStorage.setItem(
          'TwitterAccessToken',
          userData.credential.accessToken
        )

      console.log(userData)
      dispatch(sendLoginSuccess())
    } catch (e) {
      dispatch(sendError(e))
      console.error(e)
    }
  }
}

export const googleLogin: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthActions>
> = () => {
  return async (dispatch: Dispatch) => {
    let provider = new firebase.auth.GoogleAuthProvider()

    try {
      const userData = await signInWithPopup(provider)
      if (userData.credential)
        localStorage.setItem(
          'GoogleAccessToken',
          userData.credential.accessToken
        )

      console.log(userData)
      dispatch(sendLoginSuccess())
    } catch (e) {
      dispatch(sendError(e))
      console.error(e)
    }
  }
}

export const emailAndPasswordLogin: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthActions>
> = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch(sendLoginSuccess())
    } catch (error) {
      dispatch(sendError(error))
      console.error(error)
    }
  }
}
