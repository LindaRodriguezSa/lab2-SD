#!/bin/bash

rm asd.txt
watch -n 0.5 "(date +TIME:%H:%M:%S;echo Servidor1;curl --connect-timeout 5 192.168.0.11:3000; echo '';echo Servidor2;curl --connect-timeout 5 192.168.0.12:3000; echo '';echo Servidor3;curl --connect-timeout 5 192.168.0.13:3000; echo '';echo Servidor4;curl --connect-timeout 5 192.168.0.14:3000; echo '';echo Servidor5;curl --connect-timeout 5 192.168.0.16:3000; echo '';) >> asd.txt"