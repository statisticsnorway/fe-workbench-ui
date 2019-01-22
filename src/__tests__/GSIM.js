import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import GSIM from '../pages/gsim/GSIM'

describe('GSIM', () => {
  it('Search input updates state and value', async () => {
    const component = mount(
      <MemoryRouter>
        <GSIM />
      </MemoryRouter>
    )

    component.find('input').simulate('change', {target: {value: 'Search'}})

    const innerComponent = component.find(GSIM)

    expect(component.find('input').prop('value')).toEqual('Search')
    expect(innerComponent.state('search')).toEqual('Search')
  })
})
