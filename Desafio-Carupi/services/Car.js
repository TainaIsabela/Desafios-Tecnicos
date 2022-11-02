const Car = require('../models/Car');

async function getCar(identifier) {
    const getCar = await Car.findOne({
        identifier
    })
    return getCar;
}

async function createCar(payload) {
    const {
        id,
        marca,
        modelo,
        ano,
        versao,
        quilometragem,
        tipoCambio,
        preco,
    } = payload;


    if (!payload) {
        return 'Desculpe, preencha todos os campos necessários';
    }

    const newcar = new Car({
        id,
        marca,
        modelo,
        ano,
        versao,
        quilometragem,
        tipoCambio,
        preco,
    });

    const car = await Car.create(newcar);
    return car;
}

async function updateCar(identifier, payload) {
    const {
        marca,
        modelo,
        ano,
        versao,
        quilometragem,
        tipoCambio,
        preco,
    } = payload;

    if (payload == 0) {
        return 'Desculpe, preencha ao menos um campo';
    }

    await Car.findOneAndUpdate({
        identifier
    }, {
        marca,
        modelo,
        ano,
        versao,
        quilometragem,
        tipoCambio,
        preco,
    });

    const car = await Car.findOne({
        identifier
    });

    return car;

}

async function deleteCar(identifier) {
    const deletedCar = await Car.findOneAndDelete({
        identifier
    });
    return 'Carro deletado com sucesso!';
}

async function getAllCars() {
    const allCars = await Car.findMany();
    return allCars;
}

module.exports = {
    getCar,
    createCar,
    updateCar,
    deleteCar
};