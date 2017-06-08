#!/bin/bash

# Enable the relavant device tree overlays
echo BB-UART1 > /sys/devices/platform/bone_capemgr/slots
echo BB-UART4 > /sys/devices/platform/bone_capemgr/slots

#sleep for a little while and then check if they loaded
sleep 5
cat /sys/devices/platform/bone_capemgr/slots

# Start the node serial send and receiver
node /usr/src/app/index.js
