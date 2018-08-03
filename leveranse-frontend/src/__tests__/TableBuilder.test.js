import React from 'react'
import { Input, Header, Dimmer, Loader, Popup, Button, Divider, Message } from 'semantic-ui-react'
import ReactTable from 'react-table'
import { mount, shallow } from 'enzyme'
import TableBuilder from '../pageBuilderTest/builders/TableBuilder'
import { tables } from '../pageBuilderTest/utilities/TableConfiguration'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import { lowerCaseFirst } from '../pageBuilderTest/utilities/Helpers'
import { enums } from '../pageBuilderTest/utilities/Enums'

// const response = {color: 'red', header: 'Text', text: 'Text', icon: 'warning'}

//jest.mock('../pageBuilderTest/utilities/DataExchange')

Object.keys(tables).forEach((key) => {
  test('Render TableBuilder page', () => {
    let component = shallow(<TableBuilder table={tables[key]} />)

    expect(component.length).toEqual(1)
  })

  test('Something', async () => {
    let component = mount(<BrowserRouter><Route><TableBuilder table={tables[key]} /></Route></BrowserRouter>)

    expect(component.find(Dimmer).length).toEqual(1)
    expect(component.find(Loader).length).toEqual(1)

    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Header).text()).toEqual(tables[key].namePlural)

    expect(component.find(Popup).length).toEqual(1)
    expect(component.find(Input).length).toEqual(1)
    expect(component.find(NavLink).length).toEqual(1)

    expect(component.find(Button).length).toEqual(1)
    expect(component.find(Button).text()).toEqual(enums.CONTENT.CREATE_NEW + ' ' + lowerCaseFirst(tables[key].nameInNorwegian))

    expect(component.find(Message).length).toEqual(0)
    expect(component.find(Divider).length).toEqual(1)
    expect(component.find(ReactTable).length).toEqual(1)

    setImmediate(() => {
      component.update()

      console.log(component.find('TableBuilder').instance().state)
    })
  })
})
