/// <reference types="react-scripts" />
declare module 'fb-react-sdk'
declare module 'dotenv'

interface PageAccount {
  providerName: string
  id: string
  name: string
  access_token: string
}

interface AccountData {
  id: string
  name: string
  email: string
  avatar: string
  access_token: string
  pageAccounts: PageAccount[]
}
