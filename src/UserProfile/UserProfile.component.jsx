import React, { Component } from 'react';

import './UserProfile.component.css';

import UserProfileProgress from './UserProfileProgress.component.jsx';
import UserProfileProfile from './UserProfileProfile.component.jsx';
import UserProfileTasks from './UserProfileTasks.component.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UserProfile extends Component {
	
	render() {
		return (
			<div className="UserProfile">
				<UserProfileProgress />
				<div className="UserProfile__column2">
					<UserProfileProfile />
					<UserProfileTasks />
				</div>				
			</div>
		);
	}
}

export default withRouter(connect(null,null)(UserProfile));