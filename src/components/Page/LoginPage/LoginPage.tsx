import { Classes, Elevation, Intent, Spinner } from '@blueprintjs/core'
import {
  faFacebookSquare,
  faGoogle,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'redhooks'
import { ThunkDispatch } from 'redux-thunk'
import {
  createAccount,
  emailAndPasswordLogin,
  facebookLogin,
  googleLogin,
  twitterLogin
} from '../../../redux/Auth/authActions'
import { AuthState } from '../../../redux/Auth/authReducer'
import { AppState } from '../../../redux/reducers'
import * as S from './styles'

interface StateProps {
  auth: AuthState
}
interface DispatchProps {
  facebookLogin: typeof facebookLogin
  twitterLogin: typeof twitterLogin
  googleLogin: typeof googleLogin
  createAccount: typeof createAccount
  emailAndPasswordLogin: typeof emailAndPasswordLogin
}

type Props = StateProps & DispatchProps

const LoginPage: React.ComponentType<Props> = (props: Props) => {
  const {
    auth,
    facebookLogin,
    twitterLogin,
    emailAndPasswordLogin,
    googleLogin
  } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [isNewAccount, setIsNewAccount] = useState(false)
  const [errorMessage, setErrorMessage] = useState(auth.errorMessage)

  function handleSubmit() {
    if (!isNewAccount) emailAndPasswordLogin(email, password)
    else if (password !== passwordVerify) {
      setPasswordVerify('')
      setErrorMessage('La vérification du mot de passe a échouée')
    } else {
      createAccount(email, password)
      setErrorMessage('')
    }
  }

  const handleCreateAccountSwitch = () => {
    setIsNewAccount(true)
    setPassword('')
    setEmail('')
    setErrorMessage('')
  }

  if (auth.currentUser) return <Redirect to='/home' />

  return (
    <S.Background className={Classes.DARK}>
      <S.LoginLayout elevation={Elevation.ONE}>
        {auth.isLoading ? (
          <Spinner intent={Intent.PRIMARY} size={50} />
        ) : (
          <>
            <h5>Connexion</h5>
            <S.FacebookButton
              large
              icon={<FontAwesomeIcon icon={faFacebookSquare} />}
              text='Se connecter à Facebook'
              onClick={facebookLogin}
            />
            <S.TwitterButton
              large
              icon={<FontAwesomeIcon icon={faTwitter} />}
              text='Se connecter à Twitter'
              onClick={twitterLogin}
            />
            <S.GoogleButton
              large
              icon={<FontAwesomeIcon icon={faGoogle} />}
              text='Se connecter à Google'
              onClick={googleLogin}
              style={{ marginBottom: '30px' }}
            />
            <S.Input
              leftIcon='user'
              placeholder='Email...'
              large
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              value={email}
              required
            />
            <S.Input
              leftIcon='lock'
              placeholder='Mot de passe...'
              large
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              value={password}
              type='password'
              required
            />
            {isNewAccount && (
              <S.Input
                placeholder='Retapez le mot de passe...'
                large
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPasswordVerify(e.target.value)
                }
                value={passwordVerify}
                type='password'
                required
              />
            )}
            {!isNewAccount ? (
              <>
                <S.CreateAccountButton
                  text='Se connecter'
                  onClick={handleSubmit}
                />
                <S.ConnectLink onClick={handleCreateAccountSwitch}>
                  Je créé un compte
                </S.ConnectLink>
              </>
            ) : (
              <>
                <S.CreateAccountButton
                  text='Créer un compte'
                  onClick={handleSubmit}
                />
                <S.ConnectLink onClick={() => setIsNewAccount(false)}>
                  J'ai déjà un compte
                </S.ConnectLink>
              </>
            )}
            <p style={{ color: 'red' }}>{errorMessage || auth.errorMessage}</p>
          </>
        )}
      </S.LoginLayout>
    </S.Background>
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, undefined, any>
) => {
  return {
    facebookLogin: () => dispatch(facebookLogin()),
    twitterLogin: () => dispatch(twitterLogin()),
    googleLogin: () => dispatch(googleLogin()),
    createAccount: (email: string, password: string) =>
      dispatch(createAccount(email, password)),
    emailAndPasswordLogin: (email: string, password: string) =>
      dispatch(emailAndPasswordLogin(email, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
