import dataset from '../__tests__/test-data/DatasetData'
import versions from '../__tests__/test-data/DatasetDataVersions'

class DatasetServiceMock {

  getDatasetVersions () {
    return Promise.resolve(versions)
  }

  getDataset = async (id, { page, sort, order, limit }) => {
    await this.stall()
    const start = (page - 1) * limit
    let result = dataset
    if (sort) {
      result.sort(this.sortBy(sort, order !== 'asc'))
    }
    return {
      data: result.slice(start, start + limit),
      totalCount: dataset.length
    }
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

  // Simulates delay in response
  async stall (stallTime = 500) {
    await new Promise(resolve => setTimeout(resolve, stallTime))
  }

}

export default DatasetServiceMock
