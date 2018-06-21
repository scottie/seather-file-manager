const crypto = require('crypto');
const fs = require('fs');

class Decrypt {

    /**
     * Decrypt file.
     * @param {string} [file] File to Decrypt.
     * @param {string} [password] Password to decrypt file
     * @param {string} [algorithm=aes192]  Algorithmaes to decrypt, aes192 it is default algorithm.
     */
    static file(file, password, algorithm = 'aes192') {
        return new Promise(resolve => {
            const decipher = crypto.createDecipher(algorithm, password);
            const input = fs.createReadStream(file);
            const output = fs.createWriteStream(`${file}.dec`);
            input.pipe(decipher).pipe(output).on('finish', (output) => {
                console.log(`Decrypt: ${file} with password ${password}, generate output ${file}.dec`);
                resolve(output);
            });
        });
    }

}

module.exports = Decrypt;