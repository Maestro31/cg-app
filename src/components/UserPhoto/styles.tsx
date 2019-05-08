import styled, { StyledComponent } from '@emotion/styled'
import { UserPhotoProps } from './UserPhoto'

export const CircleImage: StyledComponent<
  any,
  UserPhotoProps,
  any
> = styled.div(
  {
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  ({ size }: UserPhotoProps) => ({
    height: size,
    width: size
  })
)
