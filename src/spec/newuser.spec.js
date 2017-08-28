import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { UserProfileProfile } from '../UserProfile/UserProfileProfile.component.jsx';

describe('Testing new user addition form in <UserProfileProfile> component', () => {
  // var props = {
  //   userToEdit : {}
  // }

var props =  {
    userToEdit : {
      profile : {
        name : "Ivan",
        email : "some@email.com",
        phone : "+1-000-545-11-22",
        description : ""
      }
    },
    users: [],
    action_createNewUserDB : function() {}
  }

  
  var UserTestForm = mount(<UserProfileProfile {...props} />);

  it('should check if SAVE button exist', () => {
    expect(UserTestForm.find("button.UserProfile__profile__form__button").length).toEqual(1);
  });

  it('simulates click on SAVE button', () => {
    sinon.spy(UserProfileProfile.prototype, 'action_createNewUserDB');
    var btn = UserTestForm.find("button.UserProfile__profile__form__button");
    btn.simulate('click');
    expect(spy).toHaveBeenCalled();
  });  
});