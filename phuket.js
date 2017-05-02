var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var bears = [{'id':0,'comment':'5735512063  Anti-theft System','name':'tanapon ninket'},
			];
	
var index =1;

app.use(express.static('public')) 

router.route('/bears')
	.get(function(req,res){
		res.json(bears);
	})

	.post(function(req, res) {
		var bear = {};
		bear.id = index++;
		bear.comment = req.body.comment;
		bear.name = req.body.name;
		
		bears.push(bear);
		res.json(bears);
	})

router.route('/bears/:bear_id')
	.get(function(req,res){
		res.json(bears[req.params.bear_id]);
	})

	.put(function(req, res) {
		var id = req.params.bear_id
		bears[id].comment = req.body.comment;

		bears[id].name = req.body.name;
		
		res.json(bears[req.params.bear_id]);
	})

	.delete(function(req,res){
		var id = req.params.bear_id
		delete bears[id];	
	})

	.put(function(req,res){
		var id = req.params.bear_id
		bears[id].name = req.body.name
		
		// res.json(bears[id])
		res.json({message: 'Bear updated'})
	})

	.delete(function(req,res){
		var id = req.params.bear_id
		delete bears[id]
		// res.json(bears)
		res.json({message: 'Bear deleted'})
	})

// all of our routes will be prefixed with /api
app.use('/api',bodyParser.json(),router);

app.listen(8000);
console.log('web sarver is running...');