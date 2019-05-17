import { Classes, Intent, Spinner } from '@blueprintjs/core'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Provider, { useStore } from 'redhooks'
import HomePage from '../components/Page/HomePage'
import LoginPage from '../components/Page/LoginPage'
import PrivateRoute from '../components/PrivateRoute'
import { Background } from '../components/sharedComponents'
import { disconnectUser, login } from '../redux/Auth/authActions'
import store from '../redux/reducers'
import { firebaseApp } from '../service/Firebase'
import './App.css'

let initializingApp = true

const AppWithStore: React.FC<any> = () => {
  const { dispatch } = useStore()

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      initializingApp = false
      if (user) dispatch(login(user))
      else dispatch(disconnectUser())
    })
  }, [dispatch])

  if (initializingApp)
    return (
      <Background
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className={Classes.DARK}>
        <Spinner intent={Intent.PRIMARY} size={50} />
      </Background>
    )

  return (
    <Router>
      <PrivateRoute path='/home' component={HomePage} />
      <Route exact path='/login' component={LoginPage} />
    </Router>
  )
}

const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <AppWithStore />
    </Provider>
  )
}

export default App
