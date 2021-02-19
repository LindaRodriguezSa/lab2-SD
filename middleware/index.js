const express = require("express");
const app = express();
const port = 2000;
const nodemailer = require("nodemailer");
var fs = require("fs");
const exec = require("child_process").exec;

app.use(express.static("./public"));

var contadorServer = 0;
function getInfo() {
  let data;
  var valor;
  var asd = "";
  var dato = "";
  var fin = false;
  var info = fs.readFileSync("log.txt").toString();
  data = info.split("}");
  valor = data.length;
  for (var i = 0; i < valor; i++) {
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
  var info = getInfo();
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
      pass: "9%mN*wSe", //aqui va la contraseña del correo
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

app.get("/getInstance", (req, res) => {
  exec("bash prueba.sh", (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
  });
});

app.get("/getquote", (req, res) => {
  res.send(
    "Para trabajar basta estar convencido de una cosa: que trabajar es menos aburrido que divertirse"
  );
});

app.listen(port, () => {
  console.log(`Server One, listening at port: ${port}`);
});
