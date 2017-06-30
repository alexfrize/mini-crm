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

router.put('/api/updatetaskbyid', function(req, res) {
	var _task_id = req.query.task;
	// res.send(_task_id);

	// if (!req.query || !_id) res.send("Error: No id specified");
	// if (_id.length !== 24) res.send("Error: Incorrect id");
	
	var toFind = {"tasks" : { $elemMatch : {"task_id" : _task_id}}};
	// var toFind = {"tasks" : { $elemMatch : {"time" : "12:00 PM"}}};
	// var toFind = {"tasks" : { $not : { $elemMatch : {"description" : ""}}}};
	// var toFind = {"tasks" : { $elemMatch : {"time" : "12:00 PM"}}};
	console.log("req.body ===", req.body);
	console.log("_task_id ===",_task_id);
	res.send("ok");//
	// var newObj = { $set : {"tasks.$.time" : "12:34 PM"} };
	// db.users.update(toFind, newObj, (err, data) => {
	// 	if (err) res.send("Error: DB error");
	// 	else res.json(data);
	// });

});

// router.get('/api/getone', function(req, res){
//   res.send('id: ' + req.query.id);
// });

module.exports = router;