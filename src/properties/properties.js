let properties

if (process.env.NODE_ENV === 'test') {
  properties = require('./properties-test')
} else {
  switch(process.env.REACT_APP_ENV) {
    case 'development': {
      properties = require('./properties-development')
      break
    }
    case 'staging': {
      properties = require('./properties-staging')
      break
    }
    case 'production': {
      properties = require('./properties-staging')
      break
    }
    default: {
      properties = require('./properties-default')
    }
  }
}

export default { ...properties.default}