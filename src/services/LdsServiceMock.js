import Roles from '../__tests__/test-data/Roles'

class LdsServiceMock {
  static getRoles = () => {
    console.debug('Calling getRoles() from LdsServiceMock')
    return new Promise( (resolve => resolve(Roles)))
  }
}

export default LdsServiceMock