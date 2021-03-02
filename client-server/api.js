const express = require('express');
const quotes = require('./quotes');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.text({ limit: '60mb' }));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', (req, res) => {
	res.send('Funcionando');
});

app.post('/getQuote', (req, res) => {
	//let aux = req.body;
	//let base64Image = aux.replace(/^data:image\/png;base64,/, '');
	//fs.writeFile('img.jpg', base64Image, 'base64', (err) => console.log('Error al base 64 image'));

	console.log('Frase solicitada');
	res.send(quotes.getRandomQuote());
});

app.listen(port, () => {
	console.log(`Client Server, listening at port: ${port}`);
});
