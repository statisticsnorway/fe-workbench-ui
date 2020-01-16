import { get, post, put } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

const backendurl = Properties.api.backend
class BackendServiceImpl {

  searchUserPreferences = (username) => {
    console.log(username, 'username')
     return get(backendurl + 'preferences?username=' + username)
  }

  createOrUpdateUserPreferences = (userId, prefs) => {
    console.log(prefs)
    return new Promise( (resolve, reject) => {
      this.searchUserPreferences(userId)
        .then( result => {
          if (result.length > 0 ) { // User exists, update
            //TODO: find a better way to solve this (RSA 16.01.2020)
            return resolve(Properties.mock.user != 'admin' ? (put(backendurl + 'preferences/' + result[0].uuid,
               JSON.stringify(prefs))): JSON.stringify(prefs))
          } else { // User does not exist, create
            let json = '{"username":"' + userId + '","preferences":{}}'
            let body = JSON.parse(json)
            body['preferences'] = prefs['preferences']
            return resolve(post(backendurl + 'preferences', JSON.stringify(body)))
          }}
        ).catch( (error) => {
          return reject(error)
        }
      )
    })
  }
}

export default BackendServiceImpl