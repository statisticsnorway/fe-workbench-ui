import React from 'react';
import WelcomePage from '../../pages/WelcomePage';
import renderer from 'react-test-renderer';

it('test component using snapshot', () => {
  const tree = renderer
    .create(<WelcomePage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});