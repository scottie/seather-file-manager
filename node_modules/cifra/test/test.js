const assert = require('assert');
const encrypt = require('../index').Encrypt;
const decrypt = require('../index').Decrypt;
const fs = require('fs');

let password;

before(() => {
    password = Math.random().toString();
});

describe('Encrypt()', () => {
    it('should encrypt files and generate .dec file ',() => {
        encrypt.file(`${__dirname}/text`, password);
        assert.equal(fs.existsSync(`${__dirname}/text.enc`), true);
    });
});

describe('Decrypt()', () => {
    it('should decrypt files and generate enc.dec file ',() => {
        decrypt.file(`${__dirname}/text.enc`, password);
        assert.equal(fs.existsSync(`${__dirname}/text.enc.dec`), true);
    });
});

describe('Check content file', () => {
    let originalFile = fs.readFileSync(`${__dirname}/text`, {
        encoding: 'utf8'
    });

    it('should not be equal original content VS encrypt content ',() => {
        let encryptFile = fs.readFileSync(`${__dirname}/text.enc`, {
            encoding: 'utf8'
        });
        assert.notEqual(originalFile, encryptFile);
    });

    it('should be equal original content VS decrypt content ', () => {
        let decryptFile = fs.readFileSync(`${__dirname}/text.enc.dec`, {
            encoding: 'utf8'
        });
        assert.equal(originalFile, decryptFile);
    });
});

after(() => {
    if (fs.existsSync(`${__dirname}/text.enc`)) fs.unlinkSync(`${__dirname}/text.enc`);
    if (fs.existsSync(`${__dirname}/text.enc.dec`)) fs.unlinkSync(`${__dirname}/text.enc.dec`);
});