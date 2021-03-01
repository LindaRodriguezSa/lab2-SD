const express = require("express");
const app = express();
const port = 2000;
const nodemailer = require("nodemailer");
const readLastLines = require("read-last-lines");
const fs = require("fs");
const readline = require("readline");
const axios = require("axios");
NOMBRE_ARCHIVO = "direcciones.txt";
const exec = require("child_process").exec;
const { create } = require("hbs");
var name = "";

app.use(express.static("./public"));
exec("bash creacionArchivos.sh", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  } else {
    console.log("Archivo creado");
    iniciar();
  }
});

exec("bash aux.sh", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  } else {
    console.log("archivo creado jaja");
  }
});
const servidorFuera = "";
var serverAStatus = "";

setInterval(() => {
  readLastLines.read("asd.txt", 20).then((lines) => {
    let data = lines.split("\n");
    for (var i = 0; i < data.length; i++) {
      if (data[i].includes("Servidor")) {
        if (data[i + 1] === "") {
          serverAStatus = "FAIL";
          //console.log(data[i]+": "+serverAStatus);
        } else {
          serverAStatus = "OK";
          //console.log(data[i]+": "+serverAStatus);
        }
      }
    }
  });
}, 1000);

var contadorServer = 0;

function getInfo() {
  var valor;
  var asd = "";
  var fin = false;
  var countAx = 0;
  for (let i = 0; i < listaServidores.length; i++) {
    if (listaServidores[i] != undefined) {
      countAx++;
    }
  }
  name = countAx + 1;
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
      "El servidor X se ha caido. Si desea solucionar el error, ingrese a la aplicacion!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      res.send("Email sent: " + info.response);
    }
  });
});
function createFile(nameAux) {
  fs.writeFile(
    "creacionVM.sh",
    "#!/bin/bash\n\n" +
      'VBoxManage clonevm ServidorOriginal --name="' +
      nameAux +
      '" --register --mode=all --options=KeepNATMACs --options=keepdisknames --options=keephwuuids\n' +
      'VBoxManage startvm "' +
      nameAux +
      '"\n' +
      "rm direcciones.txt\n" +
      "arp-scan --interface=wlp3s0 --localnet >>direcciones.txt",
    function (err) {
      if (err) throw err;
      console.log("Archivo Bash Creacion VM creado.");
    }
  );
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
  fs.writeFile("aux.sh", infoToPrint, function (err) {
    if (err) throw err;
    console.log("Archivo Servidores creado");
  });
}

app.get("/getInstance", (req, res) => {
  console.log("Creando...");
  exec("bash creacionVM.sh", (err, stdout, stderr) => {
    getInfo();
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    } else {
      console.log("logrado Maquina creada");
      showListaServer();
    }
  });
});

function showListaServer() {
  console.log("lista de servidores");
  for (let index = 0; index < listaServidores.length; index++) {
    if (listaServidores[index] != undefined) {
      console.log(listaServidores[index]);
    }
  }
}

var listaServidores = new Array(4);
var lineaxD = "";
var asd = "";
var contador = 0;
let lector = readline.createInterface({
  input: fs.createReadStream(NOMBRE_ARCHIVO),
});
lector.on("line", (linea) => {
  if (linea.includes("08:00:27")) {
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
    .get(`${"192.168.0.9"}:3000/getQuote`)
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((error) => console.log(error));
});

app.get("/getserverinformation", (req, res) => {
  let serverInfo = [
    {
      ip: "123.244.44.2",
      status: "ok",
    },
  ];
  for (const servidor of listaServidores) {
    serverInfo.push({
      ip: servidor,
      status: "ok",
    });
  }

  console.log(JSON.stringify(serverInfo));
  res.send(JSON.stringify(serverInfo));
});

function iniciar() {
  getInfo();
  var nameAux = "Servidor" + name;
  createFile(nameAux);
  console.log(nameAux);
  showListaServer();
}

app.listen(port, () => {
  console.log(`Server One, listening at port: ${port}`);
});
