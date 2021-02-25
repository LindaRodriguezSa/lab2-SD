const express = require('express');
const quotes = require('./quotes');
const app = express();
const port = 3000;

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', (req, res) => {
	res.send('Funcionando');
});

app.get('/getQuote', (req, res) => {
	res.send(quotes.getRandomQuote());
});

app.listen(port, () => {
	console.log(`Client Server, listening at port: ${port}`);
});
