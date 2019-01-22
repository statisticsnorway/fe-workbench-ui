import React from 'react'
import { mount } from 'enzyme'

import Login from '../pages/login/Login'

describe('Login', () => {
  it('Cannot change its value by itself but relies on recieving values as props', () => {
    const component = mount(<Login handleChange={jest.fn()} />)

    component.find('input').at(0).simulate('change', {target: {value: 'User'}})
    component.find('input').at(1).simulate('change', {target: {value: 'Password'}})

    expect(component.find('input').at(0).prop('value')).toEqual(undefined)
    expect(component.find('input').at(1).prop('value')).toEqual(undefined)
  })

  it('Properly populates values based on props', () => {
    const component = mount(<Login user='User' password='Password' />)

    expect(component.find('input').at(0).prop('value')).toEqual('User')
    expect(component.find('input').at(1).prop('value')).toEqual('Password')
  })

  it('Login button is clickable and fires passed function prop', () => {
    let mockFunction = jest.fn()

    const component = mount(<Login handleLogin={mockFunction} />)

    component.find('button').simulate('click')

    expect(mockFunction).toHaveBeenCalledTimes(1)
  })
})
