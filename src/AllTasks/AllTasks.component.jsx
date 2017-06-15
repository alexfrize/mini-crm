import React, { Component } from 'react';
import './AllTasks.component.css';
import allTasks__done from './img/all-tasks__done.svg';
import allTasks__edit from './img/all-tasks__edit.svg';
import allTasks__profile from './img/all-tasks__profile.svg';

export default class AllTasks extends Component {
	render() {
		return (
			<div className="AllTasks">
				<div className="AllTasks__header">
					<h2 className="h2">All tasks:</h2>
					<div className="AllTasks__search-box">
						<input className="AllTasks__search-box__input" type="input" placeholder="Search"/>
					</div>
				</div>
				<table className="AllTasks__table">
					<tr>
						<td>12:00 PM</td>
						<td>06/05/2017</td>
						<td>Make a phone call to Long John. Talk about new
							project in Los Angeles.Make a phone call to Long John. Talk about new
							project in Los Angeles.Make a phone call to Long John. Talk about new
							project in Los Angeles.Make a phone call to Long John. Talk about new
							project in Los Angeles.
							<table className="AllTasks__table__sub-table">
								<tr>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
								</tr>
							</table>
						</td>
						<td>
							<img className="AllTasks__table__img" src={allTasks__edit} alt="" />
							<img className="AllTasks__table__img" src={allTasks__profile} alt="" />
							<img className="AllTasks__table__img" src={allTasks__done} alt="" />
						</td>
					</tr>
					<tr>
						<td>12:00 PM</td>
						<td>06/05/2017</td>
						<td>Make a phone call to Long John. Talk about new
							project in Los Angeles.Make a phone call to Long John. Talk about new
							project in Los Angeles.Make a phone call to Long John. Talk about new
							project in Los Angeles.Make a phone call to Long John. Talk about new
							project in Los Angeles.
							<table className="AllTasks__table__sub-table">
								<tr>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
								</tr>
							</table>
						</td>
						<td>
							<img className="AllTasks__table__img" src={allTasks__edit} alt="" />
							<img className="AllTasks__table__img" src={allTasks__profile} alt="" />
							<img className="AllTasks__table__img" src={allTasks__done} alt="" />
						</td>
					</tr>
					<tr>
						<td>12:00 PM</td>
						<td>06/05/2017</td>
						<td>Make a phone call to Long John. Talk about new
							project in Los Ange a phone call to Long John. Talk about new
							project in Los Angeles.
							<table className="AllTasks__table__sub-table">
								<tr>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
								</tr>
							</table>
						</td>
						<td>
							<img className="AllTasks__table__img" src={allTasks__edit} alt="" />
							<img className="AllTasks__table__img" src={allTasks__profile} alt="" />
							<img className="AllTasks__table__img" src={allTasks__done} alt="" />
						</td>
					</tr>
					<tr>
						<td>12:00 PM</td>
						<td>06/05/2017</td>
						<td>Make a phone call to Long John. Talk about new
							project in Los Angeles.Make a phone call to Long John. Talk about new
							project inphone call to Long John. Talk about new
							project in Los Angeles.
							<table className="AllTasks__table__sub-table">
								<tr>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
									<td>Lorem ipsum dolor</td>
								</tr>
							</table>
						</td>
						<td>
							<img className="AllTasks__table__img" src={allTasks__edit} alt="" />
							<img className="AllTasks__table__img" src={allTasks__profile} alt="" />
							<img className="AllTasks__table__img" src={allTasks__done} alt="" />
						</td>
					</tr>																								
				</table>

			</div>
		);
	}
}