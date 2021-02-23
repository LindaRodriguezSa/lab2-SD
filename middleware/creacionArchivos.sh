
#!/bin/bash

rm log.txt
VBoxManage list runningvms >>log.txt
rm direcciones.txt
arp-scan --interface=wlp3s0 --localnet >>direcciones.txt