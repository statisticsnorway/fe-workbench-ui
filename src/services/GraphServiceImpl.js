import { get } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'

class GraphServiceImpl {

  getGraph = (user, statisticalProgramId, filters) => {
    return new Promise((resolve, reject) => {
      get(Properties.api.graphService + 'graph/statisticalProgram/' + statisticalProgramId + this.getQueryString(user, filters))
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  getQueryString = (user, filters) => {
    let queryStr = []
    if (user.userPrefs.preferences.lds) {
      queryStr.push('lds=' + user.userPrefs.preferences.lds)
    }
    if (filters) {
      queryStr.push(...filters)
    }

    return queryStr.length > 0 ? '?' + queryStr.join('&') : ''
  }
}

export default GraphServiceImpl
