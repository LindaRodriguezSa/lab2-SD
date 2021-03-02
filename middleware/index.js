const express = require("express");
const app = express();
const port = 2000;
const nodemailer = require('nodemailer');
const readLastLines = require('read-last-lines');
const fs = require('fs');
const readline = require('readline');
const fs2 = require('fs');
const readline2 = require('readline');
const axios = require('axios');
const NOMBRE_ARCHIVO = 'direcciones.txt';
const exec = require('child_process').exec;

var name = "";
var nameAux = "";
app.use(express.static("./public"));
var listaServidores = new Array(10);
var lineaxD = "";
var asd = "";
var contador = 0;
const servidorFuera = "";
var serverAStatus = "";
var listaServidoresStatus = new Array(10);
var sendCorreo = false;
var contFail = 0;

/**
 * Metodos exec encargados de ejecutar los bash creacionArchivos.sh y watchmv.sh
 */
exec("bash creacionArchivos.sh", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  } else {
    console.log("Archivo creado");
    iniciar();
  }
});

const fafa = exec('bash watchmv.sh', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	} else {
		console.log('archivo creado jaja');
	}
});

var counter = 0;
setInterval(() => {
	readLastLines.read('asd.txt', 10).then((lines) => {
		let data = lines.split('\n');
		for (var i = 0; i < data.length; i++) {
			if (data[i].includes('Servidor')) {
				if (data[i + 1].includes('Funcionando')== false ) {
					serverAStatus = 'FAIL';
					//console.log(data[i]+": "+serverAStatus);
					contFail++;
					if(sendCorreo==false && contFail>4){
						sendEmail(data[i]);
						sendCorreo=true;
						console.log("Email enviado");
					}
					listaServidoresStatus[counter]=serverAStatus;
					counter++;
					i++;
				} else {
					serverAStatus = 'OK';
					listaServidoresStatus[counter]=serverAStatus;
					counter++;
					//console.log(data[i]+": "+serverAStatus);
					i++;
				}
			}
		}
		var counAux=0;
		for (let i = 0; i < listaServidores.length; i++) {
			if(listaServidores[i]!= undefined){
				counAux++;
			}
		}
		if(counter>=counAux){
			counter=0;
		}
		showListaServer();
	});
	
}, 10000);

var contadorServer = 0;

function getInfo() {
  var valor = listaServidores.length;
  var asd = "";
  var fin = false;
  for (var i = 0; i < listaServidores.length; i++) {
    if (i == contadorServer) {
      asd = contadorServer + "";
      contadorServer++;
      break;
    } else if (contadorServer >= valor) {
      asd = "NO se puede porque todos los servidores estan ocupados";
      fin = true;
    }
  }
  if (fin) {
    contadorServer = 0;
  }
  return asd;
}

app.get("/getServer", (req, res) => {
  res.send(info);
});

app.get("/", (req, res) => {
  res.send("Servidor 1");
  //Metodo que se encarga de leer el archivo donde se guarda
});

//Info para enviar el correo

app.get("/email", (req, res) => {
  sendEmail();
});

/**
 * Funcion encargada de enviar el email
 */
function sendEmail(nameServerFail) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pruebasdistribuidos20@gmail.com",
      pass: "9%mN*wSe",
    },
  });

  var mailOptions = {
    from: "pruebasdistribuidos20@gmail.com",
    to: "cris.2014971130@gmail.com",
    subject: "Reporte Caida de Servidor",
    text:
      'El servidor "' +
      nameServerFail +
      '" se ha caido. Si desea solucionar el error, ingrese a la aplicacion!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      res.send("Email sent: " + info.response);
    }
  });
}

/**
 * Metooo encargado de crear el archivo bash que creara la nueva instancia, tambien
 * llama al metodo crearWatch()
 */
function createFile(nameAux) {
	fs.writeFile(
		'creacionVM.sh',
		'#!/bin/bash\n\n' +
			'VBoxManage clonevm ServidorOriginal --name="' +
			nameAux +
			'" --register --mode=all --options=KeepNATMACs --options=keepdisknames --options=keephwuuids\n' +
			'VBoxManage startvm "' +
			nameAux +
			'"\n' +
			'rm direcciones.txt\n' +
			'arp-scan --interface=wlp3s0 --localnet >>direcciones.txt',
		function (err) {
			if (err) throw err;
			console.log('Archivo Bash Creacion VM creado.');
		}
	);
}

/**
 * Metodo que crea un bash que se encargara de monitorear todas las
 * conexiones con sus IP respectivas
 */
function crearWatch() {
  var infoToPrint = "#!/bin/bash\n\n";
  infoToPrint += "rm asd.txt\n";
  infoToPrint += 'watch -n 0.5 "(date +TIME:%H:%M:%S;';
  var count = 1;
  for (let i = 0; i < listaServidores.length; i++) {
    if (listaServidores[i] != undefined) {
      infoToPrint +=
        "echo Servidor" +
        count +
        ";curl --connect-timeout 5 " +
        listaServidores[i] +
        ":3000; echo '';";
      count++;
    }
  }
  infoToPrint += ') >> asd.txt"';
  fs.writeFile("watchmv.sh", infoToPrint, function (err) {
    if (err) throw err;
    console.log("Archivo Servidores creado");
  });
}

/*
Crea una nueva instancia y la inicia
*/
app.get("/getInstance", (req, res) => {
  console.log("Creando...");
  exec("bash creacionVM.sh", (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      res.send("500");
    }else{
      console.log("logrado Maquina creada");
	  res.send("200");
    }
  });
});

// Metodo que muestra la lista de servidores
function showListaServer() {
  console.log("lista de servidores");
  for (let index = 0; index < listaServidores.length; index++) {
    if (listaServidores[index] != undefined) {
      console.log(listaServidores[index] + "	" + listaServidoresStatus[index]);
    }
  }
}

/*
Proceso encargado de leer el archivo de direcciones.txt para sacar la lista de
los nuevos servidores
*/
let lector = readline.createInterface({
  input: fs.createReadStream(NOMBRE_ARCHIVO),
});

lector.on('line', (linea) => {
	if (linea.includes('08:00:27')) {
		asd = linea.slice(0, -41);
		listaServidores[contador] = asd;
		contador++;
	}
	contador == 0;
});

/**
 * Realiza una petición @get a el servidor correspondiente, dado por balanceo de carga
 */
app.get("/getquote", (req, res) => {
  const numServer = getInfo();
  axios
    .get(`http://${listaServidores[numServer]}:3000/getQuote`)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => console.log(error));
});

app.get("/getserverinformation", (req, res) => {
  let serverInfo = [];
  for (let index = 0; index < listaServidores.length; index++) {
    serverInfo.push({
      ip: listaServidores[index],
      status: listaServidoresStatus[index],
    });
  }
  res.send(JSON.stringify(serverInfo));
});

/**
 * Inicia y crea todos los procesos que se usaran en el programa
 */
function iniciar() {
  getName();
  nameAux = "Servidor" + name;
  createFile(nameAux);
  console.log(nameAux);
  showListaServer();
}

/**
 * Metodo encargado de traer el nombre de la nueva instancia que se creara
 */
function getName() {
  var countAx = 0;
  for (let i = 0; i < listaServidores.length; i++) {
    if (listaServidores[i] != undefined) {
      countAx++;
    }
  }
  name = countAx + 1;
}

/**
 * Reinicia todos lo ssubprocesos para actualizar la nueva instancia
 */
app.get('/getreset', (req, res) => {
	console.log("Actualizando informacion");
	exec('bash creacionArchivos2.sh', (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		} else {
			console.log('Archivo creado');
			res.send("200");
		}
	});
	let lector2 = readline2.createInterface({
		input: fs2.createReadStream("direcciones2.txt"),
	});
	var pos=0;
	//falta agregar bien a la lsita, omitir los que ya estan
	lector2.on('line', (linea) => {
		if (linea.includes('08:00:27')) {
			asd = linea.slice(0, -41);
			for (let i = 0; i < listaServidores.length; i++) {
				if(listaServidores[i]!= undefined){
					if(listaServidores[i].includes(asd)){
						pos++;
						break;
					}else{
						listaServidores[pos]=asd;
						pos++;
						break;
					}					
				}
				
			}
			
		}
	});
	crearWatch();
	fafa.exitCode();
	iniciar();
});

app.listen(port, () => {
  console.log(`Server One, listening at port: ${port}`);
});
