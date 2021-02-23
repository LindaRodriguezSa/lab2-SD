const express = require("express");
const app = express();
const port = 2000;
const nodemailer = require("nodemailer");
var fs = require("fs");
const readline = require("readline");
NOMBRE_ARCHIVO = "direcciones.txt";
const exec = require("child_process").exec;
const { create } = require("hbs");
var name = "";
app.use(express.static("./public"));

exec("bash creacionArchivos.sh", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }else{
    console.log("Archivo creado");
    iniciar();
  }
});

var contadorServer = 0;

function getInfo() {
  var valor;
  var asd = "";
  var fin = false;
  valor = listaServidores.length;
  name = valor;
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
"log.txt"
function createFile(nameAux) {
  fs.writeFile('creacionVM.sh', '#!/bin/bash\n\n'+
  'VBoxManage clonevm ServidorOriginal --name="'+nameAux+'" --register --mode=all \--options=KeepNATMACs --options=keepdisknames --options=keephwuuids\n'+
  'VBoxManage startvm "'+nameAux+'"\n'+
  'rm direcciones.txt\n'+
  'arp-scan --interface=wlp3s0 --localnet >>direcciones.txt'
  , function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
}

app.get("/getInstance", (req, res) => {
  console.log("Creando...");
  exec("bash creacionVM.sh", (err, stdout, stderr) => {
    getInfo();
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }else{
      console.log("logrado Maquina creada");
      showListaServer();
    }
  });
});

function showListaServer(){
  console.log("lista de servidores");
  for (let index = 0; index < listaServidores.length; index++) {
    if(listaServidores[index]!=undefined){
      console.log(listaServidores[index]);
    }
  }
}

var listaServidores = new Array(4);
var lineaxD = "";
var asd= "";
var contador=0;
let lector = readline.createInterface({
  input: fs.createReadStream(NOMBRE_ARCHIVO)
});
lector.on("line", linea => {
  if(linea.includes("08:00:27")){
    asd = linea.slice(0, -41);
    listaServidores[contador]=asd;
    contador++;
  }
  contador==0;
});


app.get("/getquote", (req, res) => {
  res.send(
    "Para trabajar basta estar convencido de una cosa: que trabajar es menos aburrido que divertirse"
  );
});

function iniciar(){
  getInfo();
  var nameAux = "Servidor"+name;
  createFile(nameAux);
  console.log(nameAux);
  showListaServer();
}

app.listen(port, () => {  
  console.log(`Server One, listening at port: ${port}`);
});
