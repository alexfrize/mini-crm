import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
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
    }
  }

  
  var UserTestForm = mount(<UserProfileProfile {...props} />);

  it('should check if SAVE button exist', () => {
    console.log(UserTestForm.props());
    expect(UserTestForm.find("button.UserProfile__profile__form__button").length).toEqual(1);
  });

  // UserTestForm = mount(<UserProfileProfile {...props} />);
  it('simulates click on SAVE button', () => {
    console.log(UserTestForm.props());
    // var btn = UserTestForm.find("button.UserProfile__profile__form__button");
    var btn = UserTestForm.find("button.UserProfile__profile__form__button");
    console.log("\r\n\r\nbtn====",btn);
    //btn.simulate('click');
    //expect().toEqual(1);
  });  
});