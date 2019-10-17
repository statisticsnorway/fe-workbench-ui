import { get, post, put } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

const backendurl = Properties.api.backend + 'api'

class BackendServiceImpl {

  searchUserPreferences = (username) =>
     get(backendurl + '/preferences?username=' + username)

  createOrUpdateUserPreferences = (userId, prefs) => {
    return new Promise( (resolve, reject) => {
      this.searchUserPreferences(userId)
        .then( result => {
          if (result.length > 0) { // User exists, update
            return resolve(put(backendurl + '/preferences/' + result[0].uuid, JSON.stringify(prefs)))
          } else { // User does not exist, create
            let json = '{"username":"' + userId + '","preferences":{}}'
            let body = JSON.parse(json)
            body['preferences'] = prefs['preferences']
            return resolve(post(backendurl + '/preferences', JSON.stringify(body)))
          }}
        ).catch( (error) => {
          return reject(error)
        }
      )
    })
  }
}

export default BackendServiceImpl