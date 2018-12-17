import React from 'react'
import { shallow } from 'enzyme'

import App from '../App'

describe('App', () => {
  it('Renders itself without error and only once', () => {
    const component = shallow(<App lds='http://localhost:9090/' />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })
})
