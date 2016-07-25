#!/bin/env node

(function() {
    'use strict';

    const SerialPort = require('serialport');
    const chalk = require('chalk');
    const sleep = require('sleep');

    const targetPort = process.env.TARGET_PORT || 'ttyS0';
    const targetBaudrate = process.env.TARGET_BAUDRATE || 57600

    console.log(chalk.cyan("scanning for serial devices..."));
    sleep.sleep(3);
    SerialPort.list(function(err, ports) {
        if (err) {
            return console.log(chalk.red(err));
        }
        ports.forEach(function(port) {
            let foundPort = {
                comName: port.comName,
                pnpId: port.pnpId,
                manufacturer: port.manufacturer
            };
            console.log(chalk.green(JSON.stringify(foundPort)));
        });
    });

    let port = new SerialPort('/dev/' + targetPort, {
        baudRate: parseInt(targetBaudrate)
    });

    port.on('open', function() {
        sleep.sleep(3);
        console.log(chalk.cyan('write attempt: ', process.env.TEST_CMD));
        port.write(process.env.TEST_CMD, function(err) {
            if (err) {
                return console.log(chalk.red('Error on write: ', err.message));
            }
            console.log(chalk.green('message written'));
        });
    });

    port.on('data', function(data) {
        console.log(chalk.yellow('RAW: ', data, '\n'));
        console.log(chalk.green('READLINE PARSED: ', SerialPort.parsers.readline(data), '\n'));
    })

    // open errors will be emitted as an error event
    port.on('error', function(err) {
        console.log('Error: ', err.message);
    })

})();
