import React, { useContext } from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const PrivateRoute: React.SFC<any> = ({
  component: RouteComponent,
  ...rest
}: any) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(routeProps: RouteComponentProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

export default PrivateRoute
