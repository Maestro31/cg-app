import { Button, Card, Colors, InputGroup } from '@blueprintjs/core'
import styled from '@emotion/styled'

export const Background = styled.div({
  backgroundColor: Colors.DARK_GRAY2,
  height: '100vh',
  display: 'flex',
  alignItems: 'center'
})

export const LoginLayout = styled(Card)({
  margin: '0 auto',
  width: '400px',
  h5: {
    color: Colors.BLUE4,
    fontSize: '1.5em'
  },
  p: {
    fontSize: '1em'
  }
})

export const Input = styled(InputGroup)({
  marginBottom: '10px'
})

export const FacebookButton = styled(Button)({
  marginBottom: '10px',
  width: '100%',
  backgroundColor: `${Colors.COBALT1}!important`
})

export const TwitterButton = styled(Button)({
  marginBottom: '10px',
  width: '100%',
  backgroundColor: `${Colors.BLUE3}!important`
})

export const GoogleButton = styled(Button)({
  marginBottom: '10px',
  width: '100%',
  backgroundColor: `${Colors.GRAY3}!important`
})

export const CreateAccountButton = styled(Button)({
  width: '100%',
  marginBottom: '5px'
})

export const ConnectLink = styled.a({
  display: 'block',
  textAlign: 'right'
})
