import defaultProps from './properties-default'

const env = defaultProps

const ldsBaseUrl = "https://workbench.staging.ssbmod.net/be/lds"

export default {
  ...env,
  api: {
    lds: ldsBaseUrl,
    backend: "https://workbench.staging.ssbmod.net/be/workbench-backend/",
    role: ldsBaseUrl + "/ns/Role/",
    dataResource: ldsBaseUrl + "/ns/DataResource/"
  }
}