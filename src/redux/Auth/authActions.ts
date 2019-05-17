import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAccounts } from '../../service/facebook';
import { database, firebase } from '../../service/Firebase';
import { AuthActions, AuthActionTypes } from './AuthActionTypes';
import { AuthState } from './authReducer';

type AuthAction = ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthActions>
>

const sendError = (error: Error) => ({
  type: AuthActionTypes.LOGGING_FAILED,
  payload: error.message
})

const loading = () => ({
  type: AuthActionTypes.LOADING
})

export const login = (user: firebase.User) => ({
  type: AuthActionTypes.LOGGING_SUCCESS,
  payload: user
})

const disconnect = () => ({
  type: AuthActionTypes.DISCONNECT
})

const linkAccountSuccess = (user: firebase.User) => ({
  type: AuthActionTypes.LINK_ACCOUNT_SUCCESS,
  payload: user
})

const unLinkAccountSuccess = (user: firebase.User) => ({
  type: AuthActionTypes.UNLINK_ACCOUNT_SUCCESS,
  payload: user
})

const signInWithPopup = async (provider: firebase.auth.AuthProvider) => {
  const userData: firebase.auth.UserCredential = await firebase
    .auth()
    .signInWithPopup(provider)

  return userData
}

export const disconnectUser: AuthAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading())
      await firebase.auth().signOut()
      dispatch(disconnect())
    } catch (e) {
      dispatch(sendError(e))
    }
  }
}

export const createAccount: AuthAction = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading())

      const userData: firebase.auth.UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      if (userData.user) {
        database.ref(`users/${userData.user.uid}`).set({
          email: userData.user.email,
          providerId: userData.user.providerId
        })
        dispatch(login(userData.user))
      }
    } catch (error) {
      dispatch(sendError(error))
      console.error(error)
    }
  }
}

export const facebookLogin: AuthAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading())

      let provider = new firebase.auth.FacebookAuthProvider()

      provider.addScope('public_profile')
      provider.addScope('email')
      provider.addScope('manage_pages')

      const userData = await signInWithPopup(provider)
      if (userData.credential)
        localStorage.setItem(
          'fb_credential',
          JSON.stringify(userData.credential)
        )

      userData.user && dispatch(login(userData.user))
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

export const twitterLogin: AuthAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading())

      let provider = new firebase.auth.TwitterAuthProvider()

      const userData = await signInWithPopup(provider)
      if (userData.credential)
        localStorage.setItem(
          'twitter_credential',
          JSON.stringify(userData.credential)
        )

      userData.user && dispatch(login(userData.user))
    } catch (e) {
      dispatch(sendError(e))
      console.error(e)
    }
  }
}

export const googleLogin: AuthAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading())

      let provider = new firebase.auth.GoogleAuthProvider()

      const userData = await signInWithPopup(provider)

      userData.user && dispatch(login(userData.user))
    } catch (e) {
      dispatch(sendError(e))
      console.error(e)
    }
  }
}

export const emailAndPasswordLogin: AuthAction = (
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading())

      const userData = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      userData.user && dispatch(login(userData.user))
    } catch (error) {
      dispatch(sendError(error))
      console.error(error)
    }
  }
}

const linkAccountWithFacebook = async () => {
  const { currentUser } = firebase.auth()

  if (!currentUser)
    throw new Error(
      'Vous devez être connecté pour lier votre compte à Facebook'
    )

  const userData = await currentUser.linkWithPopup(
    new firebase.auth.FacebookAuthProvider()
  )

  if (userData.credential)
    localStorage.setItem('fb_credential', JSON.stringify(userData.credential))

  return currentUser
}

const linkAccountWithGoogle = async () => {
  const { currentUser } = firebase.auth()

  if (!currentUser)
    throw new Error('Vous devez être connecté pour lier votre compte à Google')

  await currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider())

  return currentUser
}

const linkAccountWithTwitter = async () => {
  const { currentUser } = firebase.auth()

  if (!currentUser) {
    throw new Error('Vous devez être connecté pour lier votre compte à Twitter')
  }

  const userData = await currentUser.linkWithPopup(
    new firebase.auth.TwitterAuthProvider()
  )

  if (userData.credential)
    localStorage.setItem(
      'twitter_credential',
      JSON.stringify(userData.credential)
    )

  return currentUser
}

export const linkAccountWithProvider: AuthAction = (providerId: string) => {
  return async (dispatch: Dispatch) => {
    let user = null
    try {
      switch (providerId) {
        case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
          user = await linkAccountWithFacebook()
          user && dispatch(linkAccountSuccess(user))
          return
        case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
          user = await linkAccountWithTwitter()
          user && dispatch(linkAccountSuccess(user))
          return
        case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
          user = await linkAccountWithGoogle()
          user && dispatch(linkAccountSuccess(user))
          return
        default:
          dispatch(sendError(new Error('Impossible de trouver ce fournisseur')))
      }
    } catch (e) {
      dispatch(sendError(e))
    }
  }
}

export const unLinkAccountWithProvider: AuthAction = (providerId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const { currentUser } = firebase.auth()
      if (currentUser) {
        await currentUser.unlink(providerId)
        dispatch(unLinkAccountSuccess(currentUser))
      }
    } catch (e) {
      dispatch(sendError(e))
    }
  }
}
