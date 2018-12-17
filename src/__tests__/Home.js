import React from 'react'
import { shallow } from 'enzyme'

import Home from '../pages/home/Home'

describe('Home', () => {
  it('Renders itself without error and only once', () => {
    const properties = {
      lds: 'http://localhost:9090/',
      user: 'Test',
      languageCode: 'en'
    }

    const component = shallow(<Home {...properties} />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })
})
