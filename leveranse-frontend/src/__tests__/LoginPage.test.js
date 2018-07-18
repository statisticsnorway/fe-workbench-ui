import React from 'react'
import {LoginPage} from '../pages/loginPage/LoginPage'
import {mount, shallow} from 'enzyme'
import configureStore from 'redux-mock-store'

describe('verify login page', () => {
  const initialState = {output: 100}
  const mockStore = configureStore()
  let store, container

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('render the connected(LoginPage) component', () => {
    container = shallow(<LoginPage store={store}/>)
    expect(container.length).toEqual(1)
  });

  it('check login button is clickable', () => {
    const mockOnClick = jest.fn();
    container = mount(<LoginPage store={store} />)
    const loginButton = container.find('button');
    loginButton.simulate('click')
  })

})
