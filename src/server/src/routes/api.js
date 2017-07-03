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
	var toFind = {"tasks" : { $elemMatch : {"task_id" : _task_id}}};
	var newObj = { $set : {"tasks.$" : req.body} };
	db.users.update(toFind, newObj, {});
	res.json({"Data" : "OK"})	
});

router.put('/api/deletetask', function(req, res) {
	var _task_id = req.body.task_id;
	db.users.update({"tasks.task_id": _task_id}, {$pull : {"tasks" : {"task_id" : _task_id}}});
	res.json({"Data" : "OK"})

});

// router.get('/api/getone', function(req, res){
//   res.send('id: ' + req.query.id);
// });

module.exports = router;