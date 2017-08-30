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
        email : "another@email.com",
        phone : "8900555-45-11",
        description : ""
      }
    },
    {
      profile : {
        name : "Giiggi Aarroron",
        email : "another@email.comwqeqewqe2 234 234 ",
        phone : "8-900555-45-11-234234234234",
        description : ""
      }
    }          
  ];
  var spy = sinon.spy();
  var props =  {
    userToEdit : userToEdit_array[0],
    users: [],
    action_createNewUserDB : () => spy()
  }
  
  var wrapper = mount(<UserProfileProfile {...props} />);

  it('should check if SAVE button exist', () => {
    expect(wrapper.find("button.UserProfile__profile__form__button").length).toEqual(1);
  });

  var btn = wrapper.find("button.UserProfile__profile__form__button");

  function checkNow() {
    it('ckecks if action_createNewUserDB is called with different parameters ()', () => {
      btn.simulate('click');
      expect(spy.called).toEqual(true);
    });  
  }

  checkNow();

  for (let i=1; i < userToEdit_array.length; i++) {
      console.log("now testing:",userToEdit_array[i]);
      wrapper.setProps({ userToEdit : userToEdit_array[i] }, checkNow);  
  }

});