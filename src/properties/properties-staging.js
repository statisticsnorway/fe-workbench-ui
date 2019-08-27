import defaultProps from './properties-default'

const env = defaultProps

const ldsBaseUrl = "https://workbench.staging.ssbmod.net/be/lds"

export default {
  ...env,
  api: {
    lds: ldsBaseUrl,
    backend: "https://workbench.staging.ssbmod.net/be/workbench-backend/",
    role: ldsBaseUrl + "/ns/Role/",
    dataResource: ldsBaseUrl + "/ns/DataResource/",
    notebookService: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/api/'
  },
  oauth: {
    authority: 'https://accounts.google.com',
    client_id: window._env_.OAUTH_CLIENT_ID,
    redirect_uri: window.location.origin + '/implicit/callback'
  }
}