import graph from 'fb-react-sdk'

export function getAccounts(access_token?: string): Promise<{}> {
  const credential = JSON.parse(localStorage.getItem('fb_credential') as string)

  if (!(access_token || credential.oauthAccessToken))
    throw new Error("Jeton d'accès Facebook non trouvé")

  graph.setAccessToken(access_token || credential.oauthAccessToken)

  return new Promise((resolve, reject) => {
    graph.get('me/accounts', function(err: any, res: any) {
      if (err) reject(err.errorMessage)

      resolve(res)
    })
  })
}
