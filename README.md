# serial-test
an application that aims to debug serial communication on resin devices

#### What does this application do?

* lists serial interfaces
* opens a connection to the target serialport
* writes a message and listens for incoming data.

## how to use

set the following (optional) env-vars:
* `TARGET_PORT` => the serialport you want to debug
* `TARGET_BAUDRATE` => the baudrate you want
* `TEST_CMD` => a write command you want to test
