import Preferences from '../__tests__/test-data/Preferences'

class BackendServiceMock {

  // Note: cannot use arrow functions with jest.mock() or jest.spyOn()
  searchUserPreferences(username) {
    console.info( '(MOCK) getting user preferences')
    let prefs = Preferences
    return Promise.resolve([prefs[username]])
  }

  createOrUpdateUserPreferences(prefs) {
    console.info('(MOCK) User preferences created or updated: ', prefs)
    return Promise.resolve(prefs)
  }
}

export default BackendServiceMock