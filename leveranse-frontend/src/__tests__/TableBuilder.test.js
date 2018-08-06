import React from 'react'
import { Input, Header, Dimmer, Loader, Popup, Button, Divider, Message } from 'semantic-ui-react'
import ReactTable from 'react-table'
import { mount, shallow } from 'enzyme'
import TableBuilder from '../pageBuilderTest/builders/TableBuilder'
import { tables } from '../pageBuilderTest/utilities/TableConfiguration'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import { lowerCaseFirst } from '../pageBuilderTest/utilities/Helpers'
import { enums } from '../pageBuilderTest/utilities/Enums'

Object.keys(tables).forEach((key) => {
  test('TableBuilder page renders one of itself', () => {
    const component = shallow(<TableBuilder table={tables[key]} />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })

  test('TableBuilder page renders correctly before and after successfull backend call in componentDidMount', () => {
    const component = mount(<BrowserRouter><Route><TableBuilder table={tables[key]} /></Route></BrowserRouter>)

    // Renders one of each expected component except <Message> (since its a successfull backend call)
    expect(component.find(Dimmer).length).toEqual(1)
    expect(component.find(Loader).length).toEqual(1)
    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Popup).length).toEqual(1)
    expect(component.find(Input).length).toEqual(1)
    expect(component.find(NavLink).length).toEqual(1)
    expect(component.find(Button).length).toEqual(1)
    expect(component.find(Message).length).toEqual(0)
    expect(component.find(Divider).length).toEqual(1)
    expect(component.find(ReactTable).length).toEqual(1)

    // Semantic components get correct values
    expect(component.find(Header).text()).toEqual(tables[key].namePlural)
    expect(component.find(NavLink).props().to).toEqual('/generic/' + lowerCaseFirst(tables[key].name) + '/new')
    expect(component.find(Button).text()).toEqual(enums.CONTENT.CREATE_NEW + ' ' + lowerCaseFirst(tables[key].nameInNorwegian))

    // Check state before backend call
    const stateBefore = component.find('TableBuilder').instance().state
    const emptyArray = []
    const emptyString = ''

    expect(stateBefore.loadingTable).toBeTruthy()
    expect(stateBefore.search).toMatch(emptyString)
    expect(stateBefore.response).toMatch(emptyString)
    expect(stateBefore.tableData).toEqual(emptyArray)
    expect(stateBefore.tableColumns.length).toBeGreaterThan(0)

    for (let i = 0, l = stateBefore.tableColumns.length; i < l; i++) {
      expect(stateBefore.tableColumns[i]).toHaveProperty('Header')
      expect(stateBefore.tableColumns[i]).toHaveProperty('accessor')
      expect(stateBefore.tableColumns[i]).toHaveProperty('Cell')
    }

    setImmediate(() => {
      component.update()

      // Check state after backend call
      const stateAfter = component.find('TableBuilder').instance().state

      expect(stateAfter.loadingTable).toBeFalsy()
      expect(stateAfter.search).toMatch(emptyString)
      expect(stateAfter.response).toMatch(emptyString)
      //TODO: Fix what the mocked backend gives, so it actually fills the tableData in state
      expect(stateAfter.tableData).toEqual(emptyArray)
    })
  })

  test('Changing search input is possible and updates state', () => {
    const component = mount(<BrowserRouter><Route><TableBuilder table={tables[key]} /></Route></BrowserRouter>)
    const emptyString = ''
    const testString = 'Test'

    expect(component.find(Input).props().value).toMatch(emptyString)
    expect(component.find('TableBuilder').instance().state.search).toMatch(emptyString)

    component.find(Input).props().onChange({target: {value: testString}})

    setImmediate(() => {
      component.update()

      expect(component.find(Input).props().value).toMatch(testString)
      expect(component.find('TableBuilder').instance().state.search).toMatch(testString)
    })
  })
})
