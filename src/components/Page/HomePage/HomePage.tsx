import { Alert, Classes, Intent } from '@blueprintjs/core'
import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { useStore } from 'redhooks'
import Navbar from '../../../components/Navbar'
import { Background } from '../../sharedComponents'
import TeamPage from '../TeamPage'
import UserAccountPage from '../UserAccountPage'

const HomePage: React.ComponentType<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { state } = useStore()
  return (
    <Background className={Classes.DARK}>
      <Navbar />
      <Switch>
        <Route path='/home/userAccount' component={UserAccountPage} />
        <Route path='/home/settings' />
        <Route path='/home/teams' component={TeamPage} />
      </Switch>
      <Alert
        className={Classes.DARK}
        confirmButtonText='Ok'
        icon='info-sign'
        intent={Intent.PRIMARY}
        isOpen={state.auth.errorMessage !== ''}
      />
    </Background>
  )
}

export default HomePage
