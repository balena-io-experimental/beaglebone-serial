#!/bin/env node

(function() {
    'use strict';

    const SerialPort = require('serialport');
    const chalk = require('chalk');
    const sleep = require('sleep');

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

    let port = new SerialPort('/dev/' + process.env.TARGET_PORT, {
        baudRate: parseInt(process.env.TARGET_BAUDRATE),
        parser: SerialPort.parsers.readline('\n'),
        autoOpen: false
    });

    setTimeout(function() {
        port.open(function() {
            console.log(chalk.green('connected to ', process.env.TARGET_PORT, 'with baudrate: ', process.env.TARGET_BAUDRATE));
            sleep.sleep(3);
            console.log(chalk.cyan('write attempt: ', process.env.TEST_CMD));
            port.write(process.env.TEST_CMD, function(err) {
                if (err) {
                    return console.log(chalk.red('Error on write: ', err.message));
                }
                console.log(chalk.green('message written'));
            });
        });
    }, 10000);

    port.on('data', function(data) {
        console.log(chalk.yellow('Data received: ', data, '\n'));
    })

    port.on('error', function(err) {
        console.log('Error: ', err.message);
    })

})();
