// ===============================================================================================
export function deleteFromDB(taskToDelete) {
	var _url = "/api/deletetask";
	fetch(_url, {
		method : "DELETE",
		headers: {
			"Content-Type" : "application/json"
		},
		body: taskToDelete
	})
	.catch(err => {
		console.error(err);
	});
}

// ===============================================================================================
export function updateTasksForOneUserDB(userToEdit) {
	var _url = "/api/updatealltasksforoneuser";
	fetch(_url, {
		method : "PUT",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(userToEdit)
	})
	.catch(err => {
		console.error(err);
	});
}

// ===============================================================================================
export function updateOneTaskDB(taskToUpdate) {
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
export function updateUserProfileDB(userToUpdate) {
	var _url="/api/updateuserprofile";
	var dataToUpdate = JSON.stringify(userToUpdate);
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