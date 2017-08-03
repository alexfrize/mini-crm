import {
		LOADED_FROM_DB,
		DELETE_TASK_FROM_DB,
		UPDATE_USER_TO_EDIT,
		UPDATE_TASKS_FOR_ONE_USER_DB,
		UPDATE_ONE_TASK_IN_TASK_LIST,
		CREATE_NEW_USER_DB,
		UPDATE_USER_PROFILE_DB,
		UPDATE_PROGRESS_FOR_ONE_USER_DB
	} from '../constants';

export const action__loadedDataFromDB = function(users) {
	return {
		type: LOADED_FROM_DB,
		users
	}	
}

export const action__deleteTaskFromDB = function(taskToDelete) {
	return {
		type: DELETE_TASK_FROM_DB,
		taskToDelete
	}	
}

export const action_updateTasksForOneUserDB = function(userToEdit) {
	return {
		type: UPDATE_TASKS_FOR_ONE_USER_DB,
		userToEdit
	}
}

export const action__updateUserToEdit = function(userToEdit) {
	return {
		type: UPDATE_USER_TO_EDIT,
		userToEdit
	}	
}

export const action__updateProgressForOneUserDB = function(userToEdit) {
	return {
		type: UPDATE_PROGRESS_FOR_ONE_USER_DB,
		userToEdit
	}	
}

export const action_updateOneTaskDB = function(taskToUpdate) {
	return {
		type: UPDATE_ONE_TASK_IN_TASK_LIST,
		taskToUpdate
	}
}

export const action_createNewUserDB = function(newUserProfile) {
	var newUserObject = {
		profile : newUserProfile,
		tasks : [],
		progress: [{
			"isActive": "",
			"description" : ""
		}]
	}
	var _url = "/api/createnewuser";
	return {
		type: CREATE_NEW_USER_DB,
		payload: new Promise ((resolve, reject) => {
			fetch(_url, {
				method: "POST",
				headers: {
					"Content-Type" : "application/json"
				},
				body: JSON.stringify(newUserObject)
			})
			.then((res) => res.json(), (err) => { console.error("Error: "); reject(err) })
			.then((res) => {
				newUserObject._id = res._id;
				resolve(newUserObject);
				}
			)
			.catch(err => console.error(err));
		})
	}
}

export const action_updateUserDB = function(users, userToEdit) {
	return {
		type : UPDATE_USER_PROFILE_DB,
		users,
		userToEdit
	}
}
