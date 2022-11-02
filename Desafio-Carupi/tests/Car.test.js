const assert = require('assert');
const service = require('../services/Car');
const mongoose = require("mongoose");
require('dotenv').config();

const car = {
    id: "09",
    marca: "Toyota",
    modelo: "Sedan",
    ano: 2009,
    versao: "Voyage",
    quilometragem: 12,
    tipoCambio: "Automatico",
    preco: "100000",
};
const updateCar = {
    marca: "Toyota",
    modelo: "Sedan",
    ano: 2012,
    versao: "Voyage",
    quilometragem: 0,
    tipoCambio: "Automatico",
    preco: "100000",
};


beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Conectado ao MongoDB');
        })
        .catch(err => {
            console.log(err);
        });

});

afterAll(async () => {
    mongoose.disconnect()
});

test('should create a car', async function () {
    const carService = await service.createCar(car)
    expect(carService.marca).toBe(car.marca);
    expect(carService.modelo).toBe(car.modelo);
    expect(carService.ano).toBe(car.ano);
    expect(carService.versao).toBe(car.versao);
    expect(carService.quilometragem).toBe(car.quilometragem);
    expect(carService.tipoCambio).toBe(car.tipoCambio);
    expect(carService.preco).toBe(car.preco);
});

test('should get a car', async function () {
    const carService = await service.getCar(car.id)
    expect(carService.marca).toBe(car.marca);
    expect(carService.modelo).toBe(car.modelo);
    expect(carService.ano).toBe(car.ano);
    expect(carService.versao).toBe(car.versao);
    expect(carService.quilometragem).toBe(car.quilometragem);
    expect(carService.tipoCambio).toBe(car.tipoCambio);
    expect(carService.preco).toBe(car.preco);

});

test('should update a car', async function () {
    const carService = await service.updateCar(car.id, updateCar);
    expect(carService.marca).toBe(updateCar.marca);
    expect(carService.modelo).toBe(updateCar.modelo);
    expect(carService.ano).toBe(updateCar.ano);
    expect(carService.versao).toBe(updateCar.versao);
    expect(carService.quilometragem).toBe(updateCar.quilometragem);
    expect(carService.tipoCambio).toBe(updateCar.tipoCambio);
    expect(carService.preco).toBe(updateCar.preco);
});



test('should deleted a car', async function () {
    const carService = await service.deleteCar(car.carname);
    expect(carService).toBe("Carro deletado com sucesso!");
});