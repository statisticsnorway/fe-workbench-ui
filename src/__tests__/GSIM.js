import React from 'react'
import { shallow } from 'enzyme'

import GSIM from '../pages/gsim/GSIM'

describe('GSIM', () => {
  it('Renders itself without error and only once', () => {
    const properties = {
      producer: 'GSIM',
      endpoint: 'http://localhost:9090/',
      namespace: 'data/',
      route: '/home/gsim/',
      user: 'Test',
      languageCode: 'en'
    }

    const component = shallow(<GSIM {...properties} />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })
})
