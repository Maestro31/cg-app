import { Button } from '@blueprintjs/core'
import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import * as S from './styles'

export interface UserPhotoProps {
  size?: string
}

const UserPhoto: React.FC<UserPhotoProps> = ({ size }: UserPhotoProps) => {
  const { currentUser } = useContext(AuthContext)

  return currentUser && currentUser.photoURL ? (
    <S.CircleImage size={size}>
      <img src={currentUser.photoURL} height={size} width={size} />
    </S.CircleImage>
  ) : (
    <Button text='Mon profile' icon='user' minimal rightIcon='caret-down' />
  )
}

export default UserPhoto
