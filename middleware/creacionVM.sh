#!/bin/bash

VBoxManage clonevm ServidorOriginal --name="Servidor4" --register --mode=all --options=KeepNATMACs --options=keepdisknames --options=keephwuuids
VBoxManage startvm "Servidor4"
rm direcciones.txt
arp-scan --interface=wlp3s0 --localnet >>direcciones.txt