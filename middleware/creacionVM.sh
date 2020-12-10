#!/bin/bash

VBoxManage list vms >>log.txt
VBoxManage clonevm debianServer --name="debianA" --register --mode=all \--options=KeepNATMACs --options=keepdisknames --options=keephwuuids
VBoxManage list vms >>log.txt

