import { Button, Classes, Tab, Tabs } from '@blueprintjs/core'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router'
import Navbar from '../../../components/Navbar'
import { database, firebaseApp } from '../../../service/Firebase/firebase'
import { AuthContext } from '../../AuthContext'
import { Background } from '../../sharedComponents'

const HomePage: React.ComponentType<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { currentUser } = useContext(AuthContext)
  const [isFirstTime, setIsFirstTime] = useState(false)

  const logout = () => {
    firebaseApp.auth().signOut()
  }

  useEffect(() => {
    if (currentUser)
      database
        .ref('users')
        .child(currentUser.uid)
        .once('value')
        .then(result => {
          if (!result.val()) setIsFirstTime(true)
        })
  }, [currentUser])

  if (isFirstTime) return <Redirect to='/init' />

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
