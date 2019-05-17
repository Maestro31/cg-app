import { Button } from '@blueprintjs/core'
import React from 'react'
import * as S from './styles'

export interface UserPhotoProps {
  size?: string
  photoURL?: string
}

const UserPhoto: React.FC<UserPhotoProps> = ({
  size,
  photoURL
}: UserPhotoProps) => {
  return photoURL ? (
    <S.CircleImage size={size}>
      <img alt='utilisateur' src={photoURL} height={size} width={size} />
    </S.CircleImage>
  ) : (
    <Button text='Mon profile' icon='user' minimal rightIcon='caret-down' />
  )
}

export default UserPhoto
