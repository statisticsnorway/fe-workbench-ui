import { get, post, put } from '../utilities/fetch/Fetch'

const backendurl = process.env.REACT_APP_BACKEND_URL + '/api'

class BackendServiceImpl {

  searchUserPreferences = (username) =>
     get(backendurl + '/preferences?username=' + username)

  createOrUpdateUserPreferences = (username, prefs) => {
    return new Promise( (resolve, reject) => {
      this.searchUserPreferences(username)
        .then( result => {
          if (result.length > 0) { // User exists, update
            return resolve(put(backendurl + '/preferences/' + result[0].uuid, JSON.stringify(prefs)))
          } else { // User does not exist, create
            let json = '{"username":"' + username + '","preferences":{}}'
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