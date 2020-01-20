import defaultProps from './properties-default'

const env = defaultProps

export default {
  ...env,
  mock: {
    auth: true,
    user: 'admin', // this will skip the login dialog
    backend: false,
    lds: false,
    ldsGraphql: true,
    datasetService: false,
    notebookService: false, // Set to false for the time being because mocking creating and deleting notes is to much work when working on a PoC for integration with Zeppelin
    graphService: false
  },
  api: {
    notebookService: 'http://localhost:8080/workbench/api/',
    graphService: 'http://localhost:8080/workbench/api/',
    backend: 'http://localhost:8080/workbench/api/',
    dataset: 'http://localhost:8080/workbench/api/',
    namespace: '/ns',
    lds: 'http://localhost:8080/workbench/lds',
    // lds: 'http://localhost:9090',
    ldsB: 'http://localhost:9090',
    ldsC: 'http://localhost:9090',
  }
}