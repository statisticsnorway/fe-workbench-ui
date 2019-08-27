import defaultProps from './properties-default'

const env = defaultProps

export default {
  ...env,
  mock: {
    auth: true,
    backend: true,
    lds: true,
    datasetService: true,
    notebookService: false // Set to false for the time being because mocking creating and deleting notes is to much work when working on a PoC for integration with Zeppelin
  },
  api: {
    notebookService: 'http://localhost:8080/api/'
  }
}