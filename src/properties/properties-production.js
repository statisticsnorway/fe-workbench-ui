import defaultProps from './properties-default'

const env = defaultProps

const ldsBaseUrl = "https://workbench.production.ssbmod.net/be/lds"

export default {
  ...env,
  urls: {
    lds: ldsBaseUrl,
    backend: "https://workbench.production.ssbmod.net/be/workbench-backend/",
    role: ldsBaseUrl + "/ns/Role/",
    dataResource: ldsBaseUrl + "/ns/StatisticalProgram/"
  }
}