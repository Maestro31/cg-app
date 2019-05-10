import React, { createContext, useEffect, useState } from 'react'
import { firebaseApp } from '../service/Firebase/firebase'

export interface AuthContextType {
  currentUser?: firebase.User | null
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>()

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
