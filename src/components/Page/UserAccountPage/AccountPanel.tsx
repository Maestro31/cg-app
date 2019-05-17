import { FormGroup, Switch } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'redhooks'
import { ThunkDispatch } from 'redux-thunk'
import {
  linkAccountWithProvider,
  unLinkAccountWithProvider
} from '../../../redux/Auth/authActions'
import { AuthState } from '../../../redux/Auth/authReducer'
import { AppState } from '../../../redux/reducers'
import { firebase } from '../../../service/Firebase'
import { PageContent } from '../../sharedComponents'

interface Provider {
  name: string
  providerId: string
  checked: boolean
}

const defaultProviders: Provider[] = [
  {
    name: 'Facebook',
    providerId: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    checked: false
  },
  {
    name: 'Google',
    providerId: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    checked: false
  },
  {
    name: 'Twitter',
    providerId: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    checked: false
  }
]

interface StateProps {
  auth: AuthState
}

interface DispatchProps {
  unLinkAccountWithProvider: typeof unLinkAccountWithProvider
  linkAccountWithProvider: typeof linkAccountWithProvider
}

type Props = StateProps & DispatchProps

const AccountPanel: React.FC<Props> = (props: Props) => {
  const [providers, setProviders] = useState()

  const { currentUser } = props.auth

  useEffect(() => {
    const providerIds: (string | null)[] | null =
      currentUser &&
      currentUser.providerData.map(
        (p: firebase.UserInfo | null) => p && p.providerId
      )
    setProviders(
      defaultProviders.map(p =>
        providerIds && providerIds.includes(p.providerId)
          ? { ...p, checked: true }
          : p
      )
    )
  }, [props.auth, currentUser])

  const handleChangeProviderLink = (e: any, providerId: string) => {
    if (e.target.checked) {
      props.linkAccountWithProvider(providerId)
    } else props.unLinkAccountWithProvider(providerId)
  }

  return (
    <PageContent>
      <FormGroup label='Comptes liés'>
        {providers &&
          providers.map((provider: Provider, i: number) => (
            <Switch
              key={i}
              label={provider.name}
              checked={provider.checked}
              onChange={e => handleChangeProviderLink(e, provider.providerId)}
            />
          ))}
      </FormGroup>
    </PageContent>
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, undefined, any>
) => {
  return {
    linkAccountWithProvider: (uid: string) =>
      dispatch(linkAccountWithProvider(uid)),
    unLinkAccountWithProvider: (uid: string) =>
      dispatch(unLinkAccountWithProvider(uid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPanel)
