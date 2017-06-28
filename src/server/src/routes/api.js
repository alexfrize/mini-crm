var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs('minicrm', ['users']);


router.get('/api/getusers', function(req,res) {
	db.users.find((err,data) => {
		if (err) res.send('Error');
		else res.json(data);
	});

	
});

module.exports = router;