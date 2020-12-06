const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
	res.send('Server 2');
});

app.listen(port, () => {
	console.log(`Server 2 listening at port ${port}`);
});
