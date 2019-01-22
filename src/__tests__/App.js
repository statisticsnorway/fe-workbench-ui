import React from 'react'
import { mount } from 'enzyme'

import App from '../App'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import { UI } from '../utilities/Enum'
import NotFound from '../pages/404/NotFound'

// Not so proper workaround to wait for render part of component to update. Creates race-condition. Wait for fix in Jest/Enzyme.
const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

describe('App', () => {
  it('Directs to Login if not logged in', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(component.find(Login)).toHaveLength(1)
  })

  it('Directs to Login if not logged in', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    component.find(Login).find('button').simulate('click')

    expect(component.find(Login)).toHaveLength(0)
    expect(component.find(Home)).toHaveLength(1)
  })

  it('Directs back to Login if logout', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    component.find(Login).find('button').simulate('click')
    const innerComponent = component.find(Home)
    innerComponent.findWhere(node => node.prop('content') === UI.LOGOUT[innerComponent.state('languageCode')]).simulate('click')

    expect(component.find(Login)).toHaveLength(1)
    expect(component.find(Home)).toHaveLength(0)
  })

  it('Gets values from childs handleChange', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    component.find(Login).find('input').at(0).simulate('change', {target: {name: 'user', value: 'User'}})
    component.find(Login).find('input').at(0).simulate('change', {target: {name: 'password', value: 'Password'}})

    expect(component.find(Login).find('input').at(0).prop('value')).toEqual('User')
    expect(component.find(Login).find('input').at(1).prop('value')).toEqual('Password')
    expect(component.find(App).state('user')).toEqual('User')
    expect(component.find(App).state('password')).toEqual('Password')
  })

  it('Directs to NotFound when path is not found', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/sillyPath']}>
        <App />
      </MemoryRouter>
    )

    component.find(Login).find('button').simulate('click')

    expect(component.find(Login)).toHaveLength(0)
    expect(component.find(Home)).toHaveLength(0)
    expect(component.find(NotFound)).toHaveLength(1)
  })
})
