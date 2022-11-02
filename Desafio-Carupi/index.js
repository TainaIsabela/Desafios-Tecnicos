const express = require('express');
const mongoose = require('mongoose')
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const CarControllers = require('./controllers/Car');

app.use('/', CarControllers);

mongoose.connect('mongodb+srv://admin:carupi@desafio-carupi.v2szo.mongodb.net/Desafio-Carupi?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(4000, () => {
            console.log('Servidor está rodando na porta 4000');
        });

    })
    .catch((err) => {
        console.log(err);
    })