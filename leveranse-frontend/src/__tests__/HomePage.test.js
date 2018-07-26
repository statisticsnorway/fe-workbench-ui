import React from 'react'
import { HomePage } from '../pages/homePage/HomePage'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

describe('verify Home page', () => {
  const initialState = {authentication: {user: 'mockUser@ssb.no'}}
  const mockStore = configureStore()
  let store, container

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('render HomePage component', () => {
    container = shallow(<HomePage store={store} user={initialState} />)
    expect(container.length).toEqual(1)
  })
})
