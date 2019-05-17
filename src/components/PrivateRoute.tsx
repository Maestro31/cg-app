import React from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { useStore } from 'redhooks'

const PrivateRoute: React.SFC<any> = ({
  component: RouteComponent,
  ...rest
}: any) => {
  const { state } = useStore()
  //const { currentUser } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(routeProps: RouteComponentProps) =>
        !!state.auth.currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

export default PrivateRoute
