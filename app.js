var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://kamrader:123@ds139567.mlab.com:39567/kamrade');

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRouter')(Book)

app.use('/api', bookRouter);

app.get('/', (req, res) => {
	res.send('welcome to my API!');
});

app.listen(port, () => {
	console.log('Running on PORT: ' + port);
})
