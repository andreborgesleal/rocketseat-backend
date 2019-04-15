const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors()); // todos pode acessar a aplicação e consumir os recursos dela

const server = require('http').Server(app); 
const io = require('socket.io')(server); 
io.on("connection", socket => {
    socket.on('ConnectRoom', box => {
        socket.join(box);
    })

    //console.log('OK');
})

mongoose.connect('mongodb+srv://dwmsistemas:dwmsistemas@cluster0-emcyq.mongodb.net/ohmnistack?retryWrites=true', {
    useNewUrlParser: true
});

// Middlewares
app.use((req, res, next) => {
    req.io = io;
    return next();
})
app.use(express.json()); // recebe nas requisições os dados em formato json
app.use(express.urlencoded({ extended: true})); // permite fazer upload de arquivo
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))); // permite que na rota files a url do arquivo físico seja recuperada na pasta tmp
app.use(require('./routes'));
server.listen(process.env.PORT || 3333); // para ouvir requisições tanto http quanto ws (web sockets)
