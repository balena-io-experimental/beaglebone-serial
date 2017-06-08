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

## Sample Output:
```
08.06.17 15:52:02 (+0100)  * Starting Resin.io User Application ...
08.06.17 15:52:03 (+0100)  [ ok ]
08.06.17 15:52:04 (+0100) /usr/src/app/start.sh: line 4: echo: write error: File exists
08.06.17 15:52:04 (+0100) /usr/src/app/start.sh: line 5: echo: write error: File exists
08.06.17 15:52:09 (+0100)  0: PF----  -1
08.06.17 15:52:09 (+0100)  1: PF----  -1
08.06.17 15:52:09 (+0100)  2: PF----  -1
08.06.17 15:52:09 (+0100)  3: P-----  -1 Grove Base Cape for BeagleBone,00A2,Seeedstudio,BB-GREEN-GROVE
08.06.17 15:52:09 (+0100)  4: P-O-L-   0 Override Board Name,00A0,Override Manuf,BB-UART4
08.06.17 15:52:09 (+0100)  5: P-O-L-   1 Override Board Name,00A0,Override Manuf,BB-UART1
08.06.17 15:52:11 (+0100) Opened serialReader
08.06.17 15:52:11 (+0100) Opened serialWrite
08.06.17 15:52:14 (+0100) message written to /dev/ttyS1
08.06.17 15:52:14 (+0100) Data from /dev/ttyS4: hello
08.06.17 15:52:17 (+0100) message written to /dev/ttyS1
08.06.17 15:52:17 (+0100) Data from /dev/ttyS4: hello
08.06.17 15:52:20 (+0100) message written to /dev/ttyS1
08.06.17 15:52:20 (+0100) Data from /dev/ttyS4: hello
08.06.17 15:52:23 (+0100) message written to /dev/ttyS1
08.06.17 15:52:23 (+0100) Data from /dev/ttyS4: hello
08.06.17 15:52:26 (+0100) message written to /dev/ttyS1
```