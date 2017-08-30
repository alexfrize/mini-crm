import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { UserProfileProfile } from '../UserProfile/UserProfileProfile.component.jsx';

describe('Testing new user addition form in <UserProfileProfile> component', () => {
  var userToEdit_array = [
    {
      profile : {
        name : "Long Lohn",
        email : "some@email.com",
        phone : "+1-000-545-11-22",
        description : ""
      }
    },
    {
      profile : {
        name : "Long Lohnson",
        email : "some'email'addr@email.com",
        phone : "8900555-45-11",
        description : ""
      }
    },
    {
      profile : {
        name : "Giiggi Aarroron",
        email : "onemore-another@gmail.com",
        phone : "8-900555-45-11",
        description : ""
      }
    },
    {
      profile : {
        name : "New Life",
        email : "your_new_life@somemail.ru",
        phone : "8-900555-45-11",
        description : ""
      }
    },    
    {
      profile : {
        name : "Alrety Mooraannaaei",
        email : "alrety.mooraannaaei@gmail.cn",
        phone : "8-900555-45-11",
        description : ""
      }      
    },
    {
      profile : {
        name : "Alex Commatty",
        email : "a_comaty@mail-box.io",
        phone : "8-900555-45-11",
        description : ""
      }      
    },
    {
      profile : {
        name : "Long domain name",
        email : "ld_name@mail-box.info",
        phone : "8-900555-45-11",
        description : ""
      }      
    },
    {
      profile : {
        name : "Phone with only digits",
        email : "some@email.info",
        phone : "890011155522",
        description : ""
      }      
    },
    {
      profile : {
        name : "Long phone with only digits",
        email : "some@email.info",
        phone : "+449001115522",
        description : ""
      }      
    },
    {
      profile : {
        name : "Long phone with digits and dashes",
        email : "some@email.info",
        phone : "+44-900-111-55-22",
        description : ""
      }      
    },
    {
      profile : {
        name : "Long phone with digits and dashes",
        email : "some@email.info",
        phone : "+44-900-111-555-2",
        description : ""
      }      
    }        

  ];
 
  const checkNow = (userToEdit) => {
    it('checks if action_createNewUserDB is called with different parameters ()', () => {
      const spy = sinon.spy();
      const props =  {
        userToEdit,
        users: [],
        action_createNewUserDB : spy
      }

      const wrapper = mount(<UserProfileProfile {...props} />);
      const btn = wrapper.find("button.UserProfile__profile__form__button");        
      btn.simulate('click');

      expect(spy.called).toEqual(true);
    });  
  }

  for (let i=1; i < userToEdit_array.length; i++) {
    checkNow(userToEdit_array[i]);  
  }

});