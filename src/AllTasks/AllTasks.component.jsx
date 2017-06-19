import React, { Component } from 'react';
import './AllTasks.component.css';
import allTasks__done from './img/all-tasks__done.svg';
import allTasks__edit from './img/all-tasks__edit.svg';
import allTasks__profile from './img/all-tasks__profile.svg';
import moment from 'moment';

export default class AllTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			tasks: []
		};
	}

	/* ============================================================================================================ */	
	componentWillMount() {
		this.setState({tasks: this.getTasksArray()});
	}

	/* ============================================================================================================ */	
	getTasksArray() {
		var alltasks = [];
		var taskObject = {};
		for (let userNum=0; userNum < this.props.users.length; userNum++ ) {
			for (let taskNum=0; taskNum < this.props.users[userNum].tasks.length; taskNum++) {
				if (this.props.users[userNum].tasks[taskNum].description !== "") {
					taskObject = {
						task : this.props.users[userNum].tasks[taskNum],
						user: this.props.users[userNum].profile
					};
					alltasks.push(taskObject);
				}
				else console.log(`User "${this.props.users[userNum].profile.name}" has an empty task!`)
			}
		}		
		console.log("alltasks===",alltasks);

		alltasks.sort((task1, task2) => {
			let date1 = moment(task1.task.date, 'MM/DD/YYYY');
			let date2 = moment(task2.task.date, 'MM/DD/YYYY');
			if (moment(date1).isSame(date2)) {
				let time1 = moment(task1.task.time, 'hh:mm');
				let time2 = moment(task2.task.time, 'hh:mm');
				if (moment(time1).isBefore(time2)){
					return -1;
					}
				else {
					return 1;

				}
			}
			if (moment(date1).isBefore(date2))
				return -1;
			else return 1;
		});

		return alltasks;
	}

	/* ============================================================================================================ */	
	componentDidMount() {
		console.log("this.state.tasks===",this.state.tasks);
	}

	/* ============================================================================================================ */	
	render() {
		var tasksTable = [];
		for (let i=0; i<this.state.tasks.length; i++) {
			tasksTable.push(
						<tr key={"tablerow"+i}>
							<td>{this.state.tasks[i].task.time}</td>
							<td>{this.state.tasks[i].task.date}</td>
							<td>{this.state.tasks[i].task.description}
								<table className="AllTasks__table__sub-table">
									<tbody>
										<tr>
											<td>{this.state.tasks[i].user.name}</td>
											<td>{this.state.tasks[i].user.phone}</td>
											<td>{this.state.tasks[i].user.email}</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td>
								<img className="AllTasks__table__img" src={allTasks__edit} alt="" />
								<img className="AllTasks__table__img" src={allTasks__profile} alt="" />
								<img className="AllTasks__table__img" src={allTasks__done} alt="" />
							</td>
						</tr>
			)
		}

		return (
			<div className="AllTasks">
				<div className="AllTasks__header">
					<h2 className="h2">All tasks:</h2>
					<div className="AllTasks__search-box">
						<input className="AllTasks__search-box__input" type="input" placeholder="Search"/>
					</div>
				</div>
				<table className="AllTasks__table">
					<tbody>
						{ tasksTable }																				
					</tbody>
				</table>

			</div>
		);
	}
}