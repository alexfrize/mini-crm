import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import './datepicker/datepicker.css';
import moment from 'moment';

import './UserProfileTasks.component.css';

export default class UserProfileTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {startDate: moment()}; 
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(date) {
		this.setState({
			startDate: date
		});
		console.log(date);
	}

	render_UserProfile__tasks__select() {
		var options = [];
		var val = new Array(4);
		var am_pm = "";
		var timeHour = 0;
		for (let i=0; i<=23; i++) {
			if (i < 12) {
				am_pm = " AM";
				timeHour = i;
			}
			else {
				am_pm = " PM";
				timeHour = i - 12; 
			}
			if (timeHour === 0) {
				val[0] = "12:00" + am_pm;
				val[1] = "12:15" + am_pm;
				val[2] = "12:30" + am_pm;
				val[3] = "12:45" + am_pm;
			}
			else {
				val[0] = (timeHour >= 10) ? timeHour+":00" + am_pm : "0"+timeHour+":00" + am_pm;
				val[1] = (timeHour >= 10) ? timeHour+":15" + am_pm : "0"+timeHour+":15" + am_pm;
				val[2] = (timeHour >= 10) ? timeHour+":30" + am_pm : "0"+timeHour+":30" + am_pm;
				val[3] = (timeHour >= 10) ? timeHour+":45" + am_pm : "0"+timeHour+":45" + am_pm;												
			}
			for (let c=0; c<4; c++) {
				options.push(<option key={i+"0"+c} value={val[c]}>{val[c]}</option>);
			}
		}
		return (
			<select className="UserProfile__tasks__task__input">
				{options}
			</select>
		);
	}

	render() {
		return (
					<div className="UserProfile__tasks">
						<h2 className="h2">Tasks:</h2>
							<div className="UserProfile__tasks__task">
								<div className="UserProfile__tasks__task__input-group">
									<DatePicker className="UserProfile__tasks__task__input"
									    selected={this.state.startDate}
									    onChange={this.handleChange}
									/>
									{this.render_UserProfile__tasks__select()}
								</div>
								<textarea className="UserProfile__tasks__task__task-description" placeholder="Task description:" />
							</div>
							<div className="UserProfile__tasks__form__button-container">
								<button className="UserProfile__tasks__form__button">Add task</button>
							</div>
							<div className="UserProfile__tasks__form__button-container">
								<button className="UserProfile__tasks__form__button">Save</button>
							</div>						
					</div>
		);
	}
}