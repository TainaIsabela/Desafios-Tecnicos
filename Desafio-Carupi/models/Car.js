const mongoose = require('mongoose');

const Car = mongoose.model('Car', {
    id: String,
    marca: String,
    modelo: String,
    ano: Number,
    versao: String,
    quilometragem: Number,
    tipoCambio: String,
    preco: String,
});

module.exports = Car; 