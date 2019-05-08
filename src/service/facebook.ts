import graph from 'fb-react-sdk'

export function getAccounts(access_token?: string): Promise<{}> {
  if (access_token === undefined)
    access_token = localStorage.getItem('FBaccess_token') as string

  if (access_token) graph.setAccessToken(access_token)
  else throw new Error('Jeton de connexion Facebook non trouvé')

  return new Promise((resolve, reject) => {
    graph.get('me/accounts', function(err: any, res: any) {
      if (err) reject(err.errorMessage)

      resolve(res)
    })
  })
}
