# Beaglebone dual serial-test
An application that aims to debug serial communication on resin Beaglebone devices

#### What does this application do?

* Enables UART1 and UART4
* Writes a string on `/dev/ttyS1` (UART1) every 3 seconds
* listens for incoming data on `/dev/ttyS4` (UART4) and writes it to console.

## How to use

To get serial loop you need to connect the Tx pin of UART1 to the Rx of UART4. Make sure the wires are relatively short as TTL (3.3v) level serial connections can get pretty noisy and messed up if your wires are long.

set the following (optional) env-vars:
* `TEST_CMD` => a write command you want to test
* `TARGET_BAUDRATE` => the baudrate you want

