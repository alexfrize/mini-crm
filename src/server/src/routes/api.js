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
	// res.send(_task_id);

	// if (!req.query || !_id) res.send("Error: No id specified");
	// if (_id.length !== 24) res.send("Error: Incorrect id");
	
	// var toFind = {"tasks" : { $elemMatch : {"task_id" : _task_id}}};
	// var toFind = {"tasks" : { $elemMatch : {"time" : "12:00 PM"}}};
	// var toFind = {"tasks" : { $not : { $elemMatch : {"description" : ""}}}};
	var toFind = {"tasks" : { $elemMatch : {"time" : "12:00 PM"}}};
	db.users.findOne(toFind, (err, data) => {
		if (err) res.send("Error: DB error");
		else res.json(data);
	});

});

router.put('/api/updatetask', function(req, res) {
	var _task_id = req.body.task_id;
	var toFind = {"tasks" : { $elemMatch : {"task_id" : _task_id}}};
	var newObj = { $set : {"tasks.$" : req.body} };
	db.users.update(toFind, newObj, {});
});

router.put('/api/deletetask', function(req, res) {
	var _task_id = req.body.task_id;
	var toFind = {"tasks" : { $elemMatch : {"task_id" : _task_id}}};
	db.users.update({}, {$pull : {"tasks" : {"task_id" : _task_id}}});	
	console.log("_task_id === ", _task_id);
});

// router.get('/api/getone', function(req, res){
//   res.send('id: ' + req.query.id);
// });

module.exports = router;