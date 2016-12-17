var express = require('express');


var routes = function(Book) {
	var bookRouter = express.Router();
	
	bookRouter.route('/')
		.post((req, res) => {
			// console.log(req.body);
			var book = new Book(req.body);

			book.save();
			console.log('record added');
			res.status(201).send(book);
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

	bookRouter.use('/:bookId', function(req, res, next) {
		Book.findById(req.params.bookId, function(err, book) {
			if(err) {
				res.status(500).send(err);
			} else if(book) {
				req.book = book;
				next();
			} else {
				res.status(404).send('no book found');
			}
		});
	});

	bookRouter.route('/:bookId')
		.get((req, res) => {
			res.json(req.book);
		})
		.put(function(req, res) {
			req.book.title = req.body.title;
			req.book.author = req.body.author;
			req.book.genre = req.body.genre;
			req.book.read = req.body.read;
			req.book.save(function(err) {
				if(err) {
					res.status(500).send(err);
				} else {
					res.json(req.book);
				} 
			});
		})
		.patch(function(req, res) {
			if(req.body._id) {
				delete req.body._id;
			}
			for(var p in req.body) {
				req.book[p] = req.body[p];
			}
			req.book.save(function(err) {
				if(err) {
					res.status(500).send(err);
				} else {
					res.json(req.book);
				} 
			});
		});

	return bookRouter;
};

module.exports = routes;
