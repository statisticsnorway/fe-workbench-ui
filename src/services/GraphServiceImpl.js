import { get } from '../utilities/fetch/Fetch'
import Properties from '../properties/properties'


class GraphServiceImpl {

  getGraph = (user, statisticalProgramId, cycleId, filters) => {
    console.log(Properties.api.graphService + 'graph/statisticalProgram/' + statisticalProgramId + '/' + cycleId + this.getQueryString(user, filters))
    // return Promise.resolve(get(Properties.api.graphService + 'graph/statisticalProgram/' + statisticalProgramId + '/' + cycleId + this.getQueryString(user, filters)))
    return new Promise((resolve, reject) => {
      get(Properties.api.graphService + 'graph/statisticalProgram/' + statisticalProgramId + '/' + cycleId + this.getQueryString(user, filters))
        .then(response => resolve(response))
        .catch(error => {
          console.log(error)
          reject(error)
        })
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
