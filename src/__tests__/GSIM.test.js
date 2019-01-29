import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { SchemaHandler } from 'react-components-library'

import GSIM from '../pages/gsim/GSIM'

jest.mock('react-components-library', () => ({SchemaHandler: jest.fn()}))
SchemaHandler.mockImplementation(() => Promise.resolve([]))

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
