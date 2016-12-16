var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://kamrader:123@ds139567.mlab.com:39567/kamrade');

var Book = require('./models/bookModel');
var Point = require('./models/pointModel');

var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();
var pointRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter.route('/Books')
	.post((req, res) => {
		var book = new Book();

	})
	.get((req, res) => {
		// var responseJSON = { hello: 'this is API' };
		// res.json(responseJSON);
		var query = req.query;

		Book.find(query, (err, books) => {
			if(err) res.status(500).send(err)
			else res.json(books);
		});
	});

bookRouter.route('/books/:bookId')
	.get((req, res) => {
		Book.findById(req.params.bookId, function(err, book) {
			if(err) res.status(500).send(err)
			else res.json(book);
		})
	});

pointRouter.route('/points')
	.get((req, res) => {
		var query = req.query;
		Point.find(query, (err, points) => {
			if(err) res.status(500).send(err)
			else res.json(points);
		});
	});

app.use('/api', bookRouter);
app.use('/app', pointRouter);

app.get('/', (req, res) => {
	res.send('welcome to my API!');
});

app.listen(port, () => {
	console.log('Running on PORT: ' + port);
})
