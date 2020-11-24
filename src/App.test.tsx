import React from 'react';
import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

test('App should be rendered', () => {
  const app = shallow(<App />);
  expect(app.exists()).toBe(true);
});
