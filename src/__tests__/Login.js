import React from 'react'
import { shallow } from 'enzyme'

import Login from '../pages/login/Login'

describe('Login', () => {
  it('Renders itself without error and only once', () => {
    const component = shallow(<Login />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })
})
