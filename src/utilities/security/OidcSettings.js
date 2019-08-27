import Properties from '../../properties/properties'

export const OidcSettings = {
  authority: Properties.oauth.authority,
  client_id: Properties.oauth.client_id,
  redirect_uri: Properties.oauth.redirect_uri,
  response_type: 'id_token token',
  scope: 'openid profile',
  filterProtocolClaims: true,
  loadUserInfo: true,
  response_mode: 'fragment'
}

export default OidcSettings
