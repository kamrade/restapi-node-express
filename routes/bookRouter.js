var express = require('express');


var routes = function(Book) {
	var bookRouter = express.Router();
	bookRouter.route('/Books')
		.post((req, res) => {
			// console.log(req.body);
			var book = new Book(req.body);
			book.save();
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

	bookRouter.route('/books/:bookId')
		.get((req, res) => {
			Book.findById(req.params.bookId, function(err, book) {
				if(err) res.status(500).send(err)
				else res.json(book);
			})
		});

	return bookRouter;
};

module.exports = routes;
