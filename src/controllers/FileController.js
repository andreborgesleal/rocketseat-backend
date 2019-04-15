const Box = require('../models/Box');
const File = require('../models/File');
class FileController {
    async store(req,res) {
        //console.log(req.file);
        const box = await Box.findById(req.params.id);
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);
        await box.save();
        req.io.sockets.in(box._id).emit("file", file); // recupera os clientes conectados no socket box._id e emite para eles (front end) o arquivo que foi criado
        return res.json(file);

        //return res.send('OK');
    }
}
module.exports = new FileController();