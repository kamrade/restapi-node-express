var bookController = function(Book) {

	var post = function(req, res) {
		var book = new Book(req.body);

		if(!req.body.title) {
			res.status(400);
			res.send('Title is required');
		} else {
			book.save();
			console.log('record++');
			res.status(201);
			res.send(book);
		}

	};

	var get = function(req, res) {
		var query = req.query;
		Book.find(query, (err, books) => {
			if(err) {
				res.status(500).send(err);
			}
			else {
				res.json(books);
			}
		});
	}

	return {
		post: post,
		get: get
	}

};

module.exports = bookController;
