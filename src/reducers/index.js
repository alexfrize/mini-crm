import { LOADED_FROM_DB, DELETE_TASK_FROM_DB } from '../constants';

function deleteFromDB(taskToDelete) {
	var _url = "/api/deletetask";
	fetch(_url, {
		method : "DELETE",
		headers: {
			"Content-Type" : "application/json"
		},
		body: taskToDelete
	});
}

export function mainReducer(state = [], action) {
	switch (action.type) {
		case 'UPDATE_TASK_DB' : console.log("UPDATE_TASK_DB");
								break;
		case DELETE_TASK_FROM_DB : console.log("DELETE_TASK_FROM_DB", action.taskToDelete);
								deleteFromDB(action.taskToDelete);
								return action.users;

		case LOADED_FROM_DB : console.log("LOADED_FROM_DB");
								return action.users;
		default: return state;
	}
}