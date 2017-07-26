import {
		LOADED_FROM_DB,
		DELETE_TASK_FROM_DB,
		UPDATE_USER_TO_EDIT,
		UPDATE_TASKS_FOR_ONE_USER_DB,
		UPDATE_ONE_TASK_IN_TASK_LIST,
		CREATE_NEW_USER_DB,
		NEW_USER_ID_IS_LOADED_FROM_DB
	} from '../constants';

// ===============================================================================================
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

// ===============================================================================================
function updateTasksForOneUserDB(userToEdit) {
	var _url = "/api/updatealltasksforoneuser";
	fetch(_url, {
		method : "PUT",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(userToEdit)
	});
}

// ===============================================================================================
function updateOneTaskDB(taskToUpdate) {
	var _url="/api/updatetask";
	var dataToUpdate = JSON.stringify(taskToUpdate);
	fetch(_url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: dataToUpdate
	})
	.catch(err => {
		console.error(err);
	});
}

// ===============================================================================================
function createNewUserDB(newUserProfile) {
	var newUserObject = {
		profile : newUserProfile,
		tasks : [],
		progress: [{
			"isActive": "",
			"description" : ""
		}]
	}
	var _url = "/api/createnewuser";
	fetch(_url, {
		method: "POST",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(newUserObject)
	})	
	.then(response => response.json())
	.then(response => {
		console.log("New id === ", response._id);
		newUserObject._id = response._id;
	})
	.catch(err => console.error(err));

	// console.warn(">>>res==",response);
	console.log("newUserObject._id ==>", newUserObject._id);
			/* 
				*******************************
				IMPORTANT ==> FIND BETTER SOLUTION!!!
				Now newUserObject._id === undefined
				*******************************
			*/	
	return newUserObject;
}

// ===============================================================================================
export function mainReducer(state = {users : [], userToEdit: {} }, action) {
	switch (action.type) {
		case UPDATE_USER_TO_EDIT :
								return Object.assign({}, { users: state.users , userToEdit: action.userToEdit });

		case DELETE_TASK_FROM_DB :
								deleteFromDB(action.taskToDelete);
								return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit });

		case UPDATE_TASKS_FOR_ONE_USER_DB : 
								updateTasksForOneUserDB(action.userToEdit);
								return Object.assign({}, { users: state.users,  userToEdit: action.userToEdit });

		case UPDATE_ONE_TASK_IN_TASK_LIST :
								updateOneTaskDB(action.taskToUpdate);				
								return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit });

		case CREATE_NEW_USER_DB :
								let newUserObj = createNewUserDB(action.newUserProfile);
								console.log('New is created: newUserObj === ', newUserObj);
								return Object.assign({}, { users: [...state.users, newUserObj], userToEdit: newUserObj });

		case NEW_USER_ID_IS_LOADED_FROM_DB :
								console.warn(" NEW_USER_ID_IS_LOADED_FROM_DB", state.userToEdit);
								return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit });

		case LOADED_FROM_DB :
								return Object.assign({}, { users: action.users,  userToEdit: state.userToEdit });
		default: return state;
	}
}