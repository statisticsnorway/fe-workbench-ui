import React from 'react'
import {ProvisionAgreementDesc} from '../pages/provisionAgreement/ProvisionAgreementDesc'
import {mount, shallow} from 'enzyme'
import {Checkbox} from 'semantic-ui-react'
import configureStore from 'redux-mock-store'

describe('verify ProvsiionAgreement Description page', () => {
  const initialState = {
    authentication: {user: "mockUser@ssb.no"},
    alert: {type: 'success'}
  }
  const mockStore = configureStore()
  let store, container

  test('render ProvisionAgreement Description component',  () => {
    store = mockStore(initialState)
    container = shallow(<ProvisionAgreementDesc store={store}/>)
    expect(container.length).toEqual(1)
  });

  /*test('verify edit option is active by default', (done) => {
    store = mockStore(initialState)
    container = mount(<ProvisionAgreementDesc store={store}
                                              authentication={initialState}
                                              alert={initialState}
                                              isNewProvisionAgreement={true}/>)
    const editOption = container.find(Checkbox)
    expect(editOption.text()).toEqual("Redigeringsmodus");
  });*/
})