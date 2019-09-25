import defaultProps from './properties-default'

const env = defaultProps

const ldsBaseUrl = "https://workbench.staging-bip-app.ssb.no/be/lds-c"

export default {
  ...env,
  api: {
    lds: ldsBaseUrl,
    backend: "https://workbench.staging-bip-app.ssb.no/be/workbench-backend/",
    role: ldsBaseUrl + "/ns/Role/",
    dataResource: ldsBaseUrl + "/ns/DataResource/",
    notebookService: 'https://workbench.staging-bip-app.ssb.no/be/workbench-backend/api/'
  },
  oauth: {
    authority: 'https://accounts.google.com',
    client_id: window._env_.OAUTH_CLIENT_ID,
    redirect_uri: window.location.origin + '/implicit/callback'
  }
}
