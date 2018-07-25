import React from 'react'
import { ProvisionAgreementDesc } from '../pages/provisionAgreement/ProvisionAgreementDesc'
import {mount, shallow} from 'enzyme'
import {Checkbox} from 'semantic-ui-react'
import configureStore from 'redux-mock-store'

describe('verify ProvsiionAgreement Description page', () => {
  const initialState = {authentication: {user: "mockUser@ssb.no"},
                        alert: {type: 'success'}}
  const alert = {type: 'alert-success'}
  const mockStore = configureStore()
  let store, container

  beforeEach(() => {
    store = mockStore(initialState)
    delete console.log
  })

  it('render ProvisionAgreement Description component', () => {
    container = shallow(<ProvisionAgreementDesc store={store} />)
    expect(container.length).toEqual(1)
  });

  it('verify edit option is active by default', () => {
    console.log(alert)
    container = mount(<ProvisionAgreementDesc store={store}
                                              authentication={initialState}
                                              alert={initialState}
                                              isNewProvisionAgreement={true}/>)
    const editOption = container.find(Checkbox)
    console.log(editOption.text())

  });

})

