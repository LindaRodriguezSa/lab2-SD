const express = require('express');
const app = express();
const port = 2000;
const nodemailer = require('nodemailer');
const readLastLines = require('read-last-lines');

//se debe primero ejecutar el bash llamado prueba.sh
//ya que el otro muestra la informacion e instala la copia del server

app.use(express.static('./public'));

function getInfo() {
	readLastLines.read('log.txt', 100).then((lines) => {
		let data = lines.split('\n');
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]); //lista Servidores
		}
	});
}

app.get('/', (req, res) => {
	res.send('Servidor 1');
	//Metodo que se encarga de leer el archivo donde se guarda
	getInfo();
});
//Info para enviar el correo
app.get('/email', (req, res) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'cris.2014971130@gmail.com',
			pass: '*********', //aqui va la contraseña del correo
		},
	});

	var mailOptions = {
		from: 'cris.2014971130@gmail.com',
		to: 'cris.2014971130@gmail.com',
		subject: 'Reporte Caida de Servidor',
		text: 'El servidor X se ha caido. Si desea solucionar el error, ingrese a la aplicacion!',
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.send('Error');
		} else {
			res.send('Email sent: ' + info.response);
		}
	});
});

app.listen(port, () => {
	console.log(`Server One, listening at port: ${port}`);
});
