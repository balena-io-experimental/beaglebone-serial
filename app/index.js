#!/bin/env node

{

  const chalk = require('chalk');
  const SerialPort = require('serialport');
  const port = new SerialPort(process.env.TARGET_PORT, {
    baudRate: parseInt(process.env.TARGET_BAUDRATE)
  });

  SerialPort.list((err, ports) => {
    'use strict';
    console.log(chalk.yellow('\nList of serial interfaces:'));
    ports.forEach((port) => {
      console.log(chalk.yellow(port.comName));
      if (port.pnpId) {
        console.log(chalk.yellow(port.pnpId));
      }
      if (port.manufacturer) {
        console.log(chalk.yellow(port.manufacturer));
      }
    });
    console.log(chalk.yellow('\n'));
  });

  port.on('open', () => {
    'use strict';
    port.write(process.env.TEST_CMD, (err) => {
      if (err) {
        return console.log(chalk.red('Error on write: ', err.message));
      }
      console.log(chalk.magenta('message written'));
    });
  });

  // open errors will be emitted as an error event
  port.on('error', (err) => {
    'use strict';
    console.log(chalk.red('Error: ', err.message));
  });

  port.on('data', (data) => {
    'use strict';
    console.log(chalk.cyan('Data: ' + data));
  });

}
