import defaultProps from './properties-default'

const env = defaultProps

export default {
  ...env,
  mock:{
    backend: true,
    lds: true,
    datasetService: true,
    notebookService: true
  }
}