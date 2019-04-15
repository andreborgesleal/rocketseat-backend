const multer = require('multer');
const path = require('path'); // não precisa instalar com o yarn (já é padrão do node)
const crypto = require('crypto');
module.exports = {
    // pasta raiz
    dest: path.resolve(__dirname, '..', '..', 'tmp'), // __dirname (pasta onde está o multer.js - pasta config) 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                // 21344aheyesdy554-teste.jpg
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null,file.key);
            })
        } // cb = call back
    })
};