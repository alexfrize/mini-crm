import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import  { Menu } from '../Menu/Menu.component.jsx';

const MenuComponent = shallow(<Menu />);

describe('Testing Menu component', () => {
  it('should test Menu component (counting children)', () => {
     expect(MenuComponent.find('ul.Menu').children().length).toEqual(3);
  });
  it('should test if 1st LI exists in Menu component', () => {
     expect(MenuComponent.find('ul.Menu').find('li').first().length).toEqual(1);
  });  
});
