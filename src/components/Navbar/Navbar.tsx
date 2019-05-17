import {
  Alignment,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position
} from '@blueprintjs/core'
import React from 'react'
import { RouterProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { useStore } from 'redhooks'
import logo from '../../img/icon128.png'
import { disconnectUser } from '../../redux/Auth/authActions'
import UserPhoto from '../UserPhoto'

const NavBar: React.FC<RouterProps> = (props: RouterProps) => {
  const { dispatch } = useStore()
  const logout = () => dispatch(disconnectUser())

  const { state } = useStore()

  const navigateTo = (path: string) => {
    props.history.push(path)
  }

  const ProfileMenu = (
    <Menu>
      <MenuItem
        icon='user'
        text='Mon compte'
        onClick={() => navigateTo('/home/userAccount')}
      />
      <MenuItem
        icon='settings'
        text='Options'
        onClick={() => navigateTo('/home/settings')}
      />
      <MenuDivider />
      <MenuItem icon='log-out' text='se déconnecter' onClick={logout} />
    </Menu>
  )

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <img
          alt='Config Gamer Icon'
          src={logo}
          height='30'
          style={{ marginRight: '10px' }}
        />
        <NavbarHeading>Config Gamer App</NavbarHeading>
        <NavbarDivider />
        <Button
          text='Home'
          icon='home'
          minimal
          onClick={() => navigateTo('/home')}
        />
        <Button
          text='Equipes'
          icon='people'
          minimal
          onClick={() => navigateTo('/home/teams')}
        />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Popover content={ProfileMenu} position={Position.BOTTOM}>
          <UserPhoto size='40px' photoURL={state.auth.currentUser.photoURL} />
        </Popover>
      </NavbarGroup>
    </Navbar>
  )
}

export default withRouter(NavBar)
