#!/bin/bash

echo BB-UART1 > /sys/devices/platform/bone_capemgr/slots
echo BB-UART4 > /sys/devices/platform/bone_capemgr/slots
sleep 5
cat /sys/devices/platform/bone_capemgr/slots

node /usr/src/app/index.js
