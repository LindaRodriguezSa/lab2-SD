#!/bin/bash

#Este script debe ir en el directorio fuente de cada instancia, puesto que descarga y ejecuta
#el repositorio de nuestro proyecto, de 
rm -r lab2-SD
git clone https://cris2014971130:Distribuidos20@github.com/limarosa29/lab2-SD.git
npm install express --save
cd lab2-SD
cd client-server
node api.js