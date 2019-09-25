let properties

if (process.env.NODE_ENV === 'test') {
  properties = require('./properties-test')
  console.debug('Using environment: ' + process.env.NODE_ENV)
} else {
  console.debug('Using environment: ' + window._env_.REACT_APP_ENV)
  switch(window._env_.REACT_APP_ENV) {
    case 'development': {
      properties = require('./properties-development')
      break
    }
    case 'staging': {
      properties = require('./properties-staging')
      break
    }
    case 'staging-bip': {
      properties = require('./properties-staging-bip')
      break
    }
    case 'production': {
      properties = require('./properties-production')
      break
    }
    default: {
      properties = require('./properties-default')
    }
  }
}

export default { ...properties.default}