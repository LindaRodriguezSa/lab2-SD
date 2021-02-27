#!/bin/bash

VBoxManage clonevm ServidorOriginal --name="Servidor6" --register --mode=all --options=KeepNATMACs --options=keepdisknames --options=keephwuuids
VBoxManage startvm "Servidor6"
rm direcciones.txt
arp-scan --interface=wlp3s0 --localnet >>direcciones.txt