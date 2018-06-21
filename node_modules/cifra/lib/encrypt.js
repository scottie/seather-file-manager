const crypto = require('crypto');
const fs = require('fs');

class Encrypt {

    /**
     * Encrypt file.
     * @param {string} [file] File to Encrypt.
     * @param {string} [password] Password to encrypt file
     * @param {string} [algorithm=aes192]  Algorithmaes to encrypt, aes192 it is default algorithm.
     */
    static file(file, password, algorithm = 'aes192') {
        return new Promise((resolve) => {
            const cipher = crypto.createCipher(algorithm, password);
            const input = fs.createReadStream(file);
            const output = fs.createWriteStream(`${file}.enc`);
            input.pipe(cipher).pipe(output).on('finish', (output) => {
                console.log(`Encrypt: ${file} with password ${password}, generate output ${file}.enc`);
                resolve(output);
            });
        });
    };

}

module.exports = Encrypt;