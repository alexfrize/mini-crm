var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs('minicrm', ['users']);


router.get('/api/getusers', function(req,res) {
	db.users.find((err,data) => {
		if (err) res.send('Error');
		else res.json(data);
	});
});

router.get('/api/getoneuser', function(req, res) {
	var _id = req.query.id;

	if (!req.query || !_id) res.send("Error: No id specified");
	if (_id.length !== 24) res.send("Error: Incorrect id");
	
	var toFind = {"_id" : ObjectId(_id)};
	db.users.findOne(toFind, (err, data) => {
		if (err) res.send("Error: DB error");
		else res.json(data);
	});
});


router.get('/api/gettaskbyid', function(req, res) {
	var _task_id = req.query.task;
	var toFind = {"tasks" : { $elemMatch : {"time" : "12:00 PM"}}};
	db.users.findOne(toFind, (err, data) => {
		if (err) res.send("Error: DB error");
		else res.json(data);
	});
});

router.put('/api/updatetask', function(req, res) {
	var _task_id = req.body.task_id;
	console.log("_task_id",_task_id);
	var toFind = {"tasks" : { $elemMatch : {"task_id" : _task_id}}};
	var newObj = { $set : {"tasks.$" : req.body} };
	db.users.update(toFind, newObj, {});
	res.json({"Data" : "OK"})	
});

router.put('/api/updatealltasksforoneuser', function(req, res) {
	var _id = req.body._id;
	console.log("req.body", req.body);
	db.users.update({_id: ObjectId(_id)}, {tasks : req.body.tasks, profile : req.body.profile, progress : req.body.progress }); // rewriting full object!
	res.json({"Data" : "OK"})	
});

router.put('/api/updateprogressforoneuser', function(req, res) {
	var _id = req.body._id;
	db.users.update({_id: ObjectId(_id)}, {tasks : req.body.tasks, profile : req.body.profile, progress : req.body.progress }); // rewriting full object!
	res.json({"Data" : "OK"})	
});

router.delete('/api/deletetask', function(req, res) {
	var _task_id = req.body.task_id;
	db.users.update({"tasks.task_id": _task_id}, {$pull : {"tasks" : {"task_id" : _task_id}}});
	res.json({"Data" : "OK"})

});

router.post('/api/createnewuser', function(req,res) {
	var newUserObject = req.body;
	console.log(newUserObject);
	var _id = ObjectId();
	var resObj = { _id 	};
	newUserObject._id = _id;
	console.log("_id === ", _id, resObj);
	db.users.insert(newUserObject);
	res.json(resObj);
});

router.put('/api/updateuserprofile', function(req, res) {
	var _id = req.body._id;
	console.log("req.body", req.body);
	db.users.update({_id: ObjectId(_id)}, {tasks : req.body.tasks, profile : req.body.profile, progress : req.body.progress }); // rewriting full object!
	res.json({"Data" : "OK"});
});

router.delete('/api/deleteuser', function(req,res) {
	var _id = req.body._id;
	console.log("DEL :: _id === ", _id);
	db.users.remove({_id : ObjectId(_id)});
	res.json({"Data" : "OK"});
});

module.exports = router;