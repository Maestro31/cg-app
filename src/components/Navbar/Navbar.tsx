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
import logo from '../../img/icon128.png'
import { firebaseApp } from '../../service/Firebase/firebase'
import UserPhoto from '../UserPhoto'

const NavBar: React.FC = () => {
  const logout = () => firebaseApp.auth().signOut()

  const ProfileMenu = (
    <Menu>
      <MenuItem icon='user' text='Mon compte' />
      <MenuItem icon='settings' text='Options' />
      <MenuDivider />
      <MenuItem icon='log-out' text='se déconnecter' onClick={logout} />
    </Menu>
  )

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <img src={logo} height='30' style={{ marginRight: '10px' }} />
        <NavbarHeading>Config Gamer App</NavbarHeading>
        <NavbarDivider />
        <Button text='Home' icon='home' minimal />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Popover content={ProfileMenu} position={Position.BOTTOM}>
          <UserPhoto size='40px' />
        </Popover>
      </NavbarGroup>
    </Navbar>
  )
}

export default NavBar
