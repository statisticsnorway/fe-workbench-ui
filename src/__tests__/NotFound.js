import React from 'react'
import { shallow } from 'enzyme'

import NotFound from '../pages/404/NotFound'

describe('NotFound', () => {
  it('Renders itself without error and only once', () => {
    const properties = {
      location: '/something/that/does/not/exist',
      languageCode: 'en'
    }

    const component = shallow(<NotFound {...properties} />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })
})
