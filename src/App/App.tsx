import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from '../components/AuthContext'
import HomePage from '../components/Page/HomePage'
import LoginPage from '../components/Page/LoginPage'
import PrivateRoute from '../components/PrivateRoute'
import configureStore from '../redux/reducers'
import './App.css'

const store = configureStore()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <PrivateRoute exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
        </Router>
      </AuthProvider>
    </Provider>
  )
}

export default App
