import { get, post, put } from '../utilities/fetch/Fetch'

import versions from '../__tests__/test-data/DatasetDataVersions'
import dataset from '../__tests__/test-data/DatasetData'
import Properties from '../properties/properties'

const datasetUrl = Properties.api.dataset
class DatasetServiceImpl {
  // TODO Implement

  getDatasetVersions () {
    return get(datasetUrl + 'dataset/version')
  }

  getDataset = async (id, { page, sort, order, limit }) => {
    const start = (page - 1) * limit

    return new Promise((resolve, reject) => {
      get(datasetUrl + 'dataset')
        .then(response => {
          let result = resolve(response)
          if (sort) {
            result.sort(this.sortBy(sort, order !== 'asc'))
          }
          console.log(result.slice(start, start + limit), 'result in getdataset')
          return {
            data: result.slice(start, start + limit),
            totalCount: dataset.length
          }
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })

  }

  // Sorts strings and numbers
  sortBy = (field, reverse) => {
    const key = function (x) {
      let value = x[field]
      return isNaN(value) ? value : Number(value)
    }
    reverse = !reverse ? 1 : -1

    return function (x, y) {
      let a = key(x), b = key(y)
      return reverse * ((a > b) - (b > a))
    }
  }

}

export default DatasetServiceImpl
