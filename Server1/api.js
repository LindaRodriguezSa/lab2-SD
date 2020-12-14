const express = require('express');
const app = express();
const port = 3000;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
 })

app.get('/getQuote', (req, res) => {
	res.send('Para trabajar jaja');
});

app.listen(port, () => {
	console.log(`Server One, listening at port: ${port}`);
});
