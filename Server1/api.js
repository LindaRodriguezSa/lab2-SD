const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Servidor 1');
});

app.listen(port, () => {
	console.log(`Server One, listening at port: ${port}`);
});
