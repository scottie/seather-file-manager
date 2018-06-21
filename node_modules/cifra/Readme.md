# Cifra

[![Build Status](https://travis-ci.org/Luisangonzalez/cifra.svg?branch=master)](https://travis-ci.org/Luisangonzalez/cifra)
[![Coverage Status](https://coveralls.io/repos/github/Luisangonzalez/cifra/badge.svg?branch=master)](https://coveralls.io/github/Luisangonzalez/cifra?branch=master)

## cli-tool to Encrypt and Decrypt files


### Install:

`npm install -g cifra`

### Use in cli:

```bash
➜  ~ cifra -h

  Usage: cifra [options] [command]

  Encrypt and decrypt files with node


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    Encrypt|e <file> <password> [algorithm]   Encript file
    Decrypt|d <file> <password> [algorithm]  Decrypt file

```

* #### [algorithm] --> aes192 it is default algorithm.
On recent OpenSSL releases, openssl `list-cipher-algorithms` will display the available cipher algorithms.

### Use in your projects:

```js
const encrypt = require('cifra').Encrypt;
const decrypt = require('cifra').Decrypt;


// Use with await
async function encryptAndDecryptExample() {
    await encrypt.file('./arg.js', 'mafasd');
    await decrypt.file('./arg.js.enc','mafasd');
}

encryptAndDecryptExample();


// Return promise
encrypt.file('./arg.js', 'mafasd')
    .then(() => {
        decrypt.file('./arg.js.enc','mafasd');
    });
```