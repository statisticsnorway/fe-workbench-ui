import React from 'react'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Dropdown, DropdownItem, Flag } from 'semantic-ui-react'

import Home from '../pages/home/Home'
import Cards from '../pages/home/cards/Cards'
import GSIM from '../pages/gsim/GSIM'
import Workflow from '../pages/workflow/Workflow'
import NotFound from '../pages/404/NotFound'
import { LANGUAGES, UI } from '../utilities/Enum'

describe('Home', () => {
  it('Language menu works correctly', () => {
    const component = shallow(<Home />)

    expect(component.find(DropdownItem)).toHaveLength(Object.keys(LANGUAGES).length)
    expect(component.find(Flag)).toHaveLength(Object.keys(LANGUAGES).length)
    expect(component.find(Dropdown).prop('text'))
      .toEqual(UI.LANGUAGE[component.state('languageCode')] +
        ' (' + UI.LANGUAGE_CHOICE[component.state('languageCode')] + ')')

    component.find(DropdownItem).at(0).simulate('click')

    expect(component.find(Dropdown).prop('text'))
      .toEqual(UI.LANGUAGE[component.state('languageCode')] +
        ' (' + UI.LANGUAGE_CHOICE[component.state('languageCode')] + ')')
  })

  it('Logout button is clickable and fires passed function prop', () => {
    let mockFunction = jest.fn()

    const properties = {
      handleLogout: mockFunction
    }
    const component = shallow(<Home {...properties} />)

    component.findWhere(node => node.prop('content') === UI.LOGOUT[component.state('languageCode')]).simulate('click')

    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  it('NotFound rendered on base page', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    )

    expect(component.find(Cards)).toHaveLength(0)
    expect(component.find(GSIM)).toHaveLength(0)
    expect(component.find(Workflow)).toHaveLength(0)
    expect(component.find(NotFound)).toHaveLength(1)
  })

  it('Cards rendered on /home', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/home/']}>
        <Home />
      </MemoryRouter>
    )

    expect(component.find(Cards)).toHaveLength(1)
    expect(component.find(GSIM)).toHaveLength(0)
    expect(component.find(Workflow)).toHaveLength(0)
    expect(component.find(NotFound)).toHaveLength(0)
  })

  it('GSIM rendered on /home/gsim', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/home/gsim']}>
        <Home />
      </MemoryRouter>
    )

    expect(component.find(Cards)).toHaveLength(0)
    expect(component.find(GSIM)).toHaveLength(1)
    expect(component.find(Workflow)).toHaveLength(0)
    expect(component.find(NotFound)).toHaveLength(0)
  })

  it('Workflow rendered on /home/tasks', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/home/tasks']}>
        <Home />
      </MemoryRouter>
    )

    expect(component.find(Cards)).toHaveLength(0)
    expect(component.find(GSIM)).toHaveLength(0)
    expect(component.find(Workflow)).toHaveLength(1)
    expect(component.find(NotFound)).toHaveLength(0)
  })
})
