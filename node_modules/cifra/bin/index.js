#!/usr/bin/env node

const program = require('commander');
const encrypt = require('../index').Encrypt;
const decrypt = require('../index').Decrypt;

program
    .version('0.0.2')
    .description('Encrypt and decrypt files with node');

program
    .command('Encrypt <file> <password> [algorithm]')
    .alias('e')
    .description('Encript file')
    .action((file, password, algorithm) => {
        encrypt.file(file, password, algorithm);
    });

program
    .command('Decrypt <file> <password> [algorithm]d')
    .alias('d')
    .description('Decrypt file')
    .action((file, password, algorithm) => {
        decrypt.file(file, password, algorithm);
    });

program.parse(process.argv);