import { Button, Classes, Tab, Tabs } from '@blueprintjs/core'
import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import Navbar from '../../../components/Navbar'
import { firebaseApp } from '../../../service/firebase'
import { AuthContext } from '../../AuthContext'
import { Background } from '../../sharedComponents'

const HomePage: React.ComponentType<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { currentUser } = useContext(AuthContext)

  const logout = () => {
    firebaseApp.auth().signOut()
  }

  console.log(currentUser)

  return (
    <Background className={Classes.DARK}>
      <Navbar />
      <Tabs large animate renderActiveTabPanelOnly vertical>
        <Tab
          id='account-tab'
          title='Mon compte'
          panel={<div>Mon compte</div>}
        />
        <Tab id='team-tab' title='Mon équipe' panel={<div>Mon équipe</div>} />
      </Tabs>
      <Button text='Se déconnecter' onClick={logout} />
    </Background>
  )
}

export default HomePage
