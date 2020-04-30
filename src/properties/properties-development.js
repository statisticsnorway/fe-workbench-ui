import defaultProps from './properties-default'

const env = defaultProps

export default {
  ...env,
  mock: {
    auth: true,
    user: 'admin', // this will skip the login dialog
    backend: true,
    lds: false,
    datasetService: true,
    notebookService: false, // Set to false for the time being because mocking creating and deleting notes is to much work when working on a PoC for integration with Zeppelin
    graphService: false
  },
  api: {
    notebookService: 'http://localhost:8080/api/',
    graphService: 'http://localhost:8000/api/',
    namespace: '/ns',
    lds: 'http://localhost:29091',
    ldsB: 'http://localhost:9090',
    ldsC: 'http://localhost:9090',
  }
}