rm log.txt
VBoxManage list runningvms >>log.txt
rm direcciones2.txt
arp-scan --interface=wlp3s0 --localnet >>direcciones2.txt