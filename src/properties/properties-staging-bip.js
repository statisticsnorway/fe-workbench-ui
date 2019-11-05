import defaultProps from './properties-default'

const env = defaultProps

const baseUrl = "https://workbench.staging-bip-app.ssb.no/be/"

export default {
  ...env,
  api: {
    lds: baseUrl + 'lds',
    ldsB: baseUrl + 'lds-b',
    ldsC: baseUrl + 'lds-c',
    backend: baseUrl + 'workbench-backend/',
    namespace: '/ns',
    notebookService: 'https://workbench.staging-bip-app.ssb.no/be/workbench-backend/api/',
    graphService: 'https://workbench.staging-bip-app.ssb.no/be/workbench-graph-service/api/'
  },
  oauth: {
    authority: 'https://accounts.google.com',
    client_id: window._env_.OAUTH_CLIENT_ID,
    redirect_uri: window.location.origin + '/implicit/callback'
  }
}
