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

    // Gives components correct values
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

    //console.log(stateBefore)

    setImmediate(() => {
      component.update()

      // Check state after backend call
      const stateAfter = component.find('TableBuilder').instance().state

      expect(stateAfter.loadingTable).toBeFalsy()
      expect(stateAfter.search).toMatch(emptyString)
      expect(stateAfter.response).toMatch(emptyString)
      expect(stateAfter.tableData).toEqual(emptyArray)

      //console.log(stateAfter)
    })
  })

  // TODO: Why does this not work?
  test('Changing search input updates state', () => {
    const component = mount(<BrowserRouter><Route><TableBuilder table={tables[key]} /></Route></BrowserRouter>)

    console.log(component.find('TableBuilder').instance().state.search)
    console.log(component.find(Input).props())

    component.find(Input).simulate('change', {target: {value: 'Something'}})

    setImmediate(() => {
      component.update()

      console.log(component.find('TableBuilder').instance().state.search)
      console.log(component.find(Input).props())
    })
  })
})
