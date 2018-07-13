import React from 'react'
import WelcomePage from '../pages/WelcomePage'
import {mount} from 'enzyme'
import {history} from '../helpers'

describe('Verify WelcomePage component', () => {

  it('verify text on the WelcomePage', () => {
    const wrapper = mount(<WelcomePage/>)
    expect(wrapper.length).toEqual(1)
    expect(wrapper.text()).toEqual("Velkommen til ArbeidsbenkLogin");
  })

  it('verify text on the login button', () => {
    const wrapper = mount(<WelcomePage/>);
    expect(wrapper.find('.button').text()).toBe("Login")
  })

  it('verify login button is clickable', () => {
    let props;
    props = {
      history: history
    };
    const mockOnClick = jest.fn();
    const wrapper = mount(<WelcomePage {...props}/>);
    const loginButton = wrapper.find('button');
    loginButton.simulate('click')
  })
})

