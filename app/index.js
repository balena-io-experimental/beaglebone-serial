#!/bin/env node

{
  const testingString = process.env.TEST_CMD || "hello, world!"
  const chalk = require('chalk');
  const SerialPort = require('serialport');
  const serialWriter = new SerialPort('/dev/ttyS1', {
    baudRate: parseInt(process.env.TARGET_BAUDRATE)
  });
  const serialReader = new SerialPort('/dev/ttyS4', {
    baudRate: parseInt(process.env.TARGET_BAUDRATE)
  });
  serialReader.on('open', () => {
    console.log("Opened serialReader");
  });
  serialWriter.on('open', () => {
    'use strict';
    console.log("Opened serialWrite")
    setInterval(function(){  
      serialWriter.write(process.env.TEST_CMD, (err) => {
        if (err) {
          return console.log(chalk.red('Error on write: ', err.message));
        }
        console.log(chalk.magenta('message written to /dev/ttyS1'));
      });
    }, 3000);
  });

  // open errors will be emitted as an error event
  serialReader.on('error', (err) => {
    'use strict';
    console.log(chalk.red('Error: ', err.message));
  });

  serialReader.on('data', (data) => {
    'use strict';
    console.log(chalk.cyan('Data from /dev/ttyS4: ' + data));
  });

}
