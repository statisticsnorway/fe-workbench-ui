import React from 'react'
import {HomePage} from '../pages/homePage/HomePage'
import ProvisionAgreementPage from '../pages/ProvisionAgreementPage'
import {Header, Menu} from 'semantic-ui-react'
import {mount, shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import {BrowserRouter as Router} from 'react-router-dom';

describe('verify Home page', () => {
  const initialState = { authentication: { user: "mockUser@ssb.no" } }
  const mockStore = configureStore()
  let store, container

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('render HomePage component', () => {
    container = shallow(<HomePage store={store} user={initialState} />)
    expect(container.length).toEqual(1)
  });

  it('render menus option', () => {
    container = mount(<Router><ProvisionAgreementPage/></Router>)
    expect(container.find(Menu).length).toEqual(7);
    const menus = container.find(Menu)
    //delete console.log
    //console.log(menus.at(0).text());
    expect(menus.at(0).text()).toContain('Hjem')
    expect(menus.at(0).text()).toContain('Opprett ny')
    expect(menus.at(0).text()).toContain('Kopier')
    expect(menus.at(0).text()).toContain('Slett')

    expect(menus.at(1).text()).toContain('Variabel')
    expect(menus.at(1).text()).toContain('Opprett ny')

    expect(menus.at(2).text()).toContain('Verdiområde')
    expect(menus.at(2).text()).toContain('Administrer')

    expect(menus.at(3).text()).toContain('Enhetstyper')
    expect(menus.at(3).text()).toContain('Administrer')

    expect(menus.at(4).text()).toContain('Populasjoner')
    expect(menus.at(4).text()).toContain('Valg')
  });

  it('verify home section (List og ProvisionAgreements)', () =>{
    container = mount(<Router><ProvisionAgreementPage/></Router>)
    const menus = container.find(Menu)
    const provisionAgreementSection = menus.at(0)
    delete console.log
    const provisionAgreementOptions = provisionAgreementSection.find('.item')
    const homeLink = provisionAgreementOptions.at(2)
    homeLink.simulate('click');
  });

  it('verify create provisionAgreement section', () =>{
    container = mount(<Router><ProvisionAgreementPage/></Router>)
    const menus = container.find(Menu)
    const provisionAgreementSection = menus.at(0)
    delete console.log
    const provisionAgreementOptions = provisionAgreementSection.find('.item')
    const createPaOption = provisionAgreementOptions.at(3)
    const createPaLink = provisionAgreementSection.find('a').at(0);
    createPaOption.simulate('click');

  });

})
