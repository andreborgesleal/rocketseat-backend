const express = require('express');
const multer = require('multer');
const multerConfig = require('../src/config/multer');
const routes = express.Router();
const BoxController = require("../src/controllers/BoxController");
const FileController = require("../src/controllers/FileController");

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post("/boxes/:id/files", 
            multer(multerConfig).single("file"), // informado pelo frontend
            FileController.store
); // locahost:3333/boxes/23254ffd545/files (onde 23254ffd545 é o id da BOX)


// routes.get('/teste', (req, res) => {
//     return res.send('Hello Rocket');
// });
module.exports = routes;