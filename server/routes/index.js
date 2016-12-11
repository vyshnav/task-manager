(function() {
'use strict';
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin123@ds133158.mlab.com:33158/tm', ['tasks']);
/* GET home page. */
router.get('/', function(req, res) {
res.render('index');
});

router.get('/api', function(req, res) {
	db.tasks.find(function(err, data) {
		res.json(data);
	});
});

router.post('/api/addtask/', function(req, res) {
	db.tasks.insert(req.body, function(err, data) {
	   res.json(data);
	});
});

router.put('/api/edit/task', function(req, res) {
db.tasks.update({_id: mongojs.ObjectId(req.body._id)},
 {taskName: req.body.taskName}, {},
  function(err, data) {
	res.json(data);
	});
});

router.delete('/api/delete/task/:_id', function(req, res) {
db.tasks.remove({_id: mongojs.ObjectId(req.params._id)}, '', 
	function(err, data) {
	res.json(data);
	});
});


router.get('/api/task/:_id', function(req, res) {
	db.tasks.findOne({_id: mongojs.ObjectId(req.params._id)},function(err, data) {
		res.json(data);
	});
});

router.post('/api/task/add/todo/:_id', function(req, res) {
	db.tasks.update({_id: mongojs.ObjectId(req.params._id)},
		{ $push: { todos: req.body }},{},
		function(err, data) {
	   res.json(data);
	});
});

router.put('/api/task/edit/todo/:_id', function(req, res) {
db.tasks.update({_id: mongojs.ObjectId(req.params._id),"todos.id": req.body.id},
 {$set: { "todos.$" : {id:req.body.id,isCompleted: req.body.isCompleted,todo: req.body.todo}}}, {},
  function(err, data) {
	res.json(data);
	});
});

router.put('/api/task/delete/todo/:_id', function(req, res) {
db.tasks.update({_id: mongojs.ObjectId(req.params._id)},
		{ $pull: { todos: {id:req.body.id,isCompleted: req.body.isCompleted,todo: req.body.todo} }},{},
		function(err, data) {
	   res.json(data);
	});
});

module.exports = router;
}());