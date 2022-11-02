const router = require('express').Router();
const services = require('../services/Car');

router.post('/Car', async (req, res) => {
    const payload = req.body;
    await services.createCar(payload).then(Car => {
        res.json(Car);
    }).catch(err => {
        res.json(err);
    });
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    await services.getCar(id).then(Car => {
        res.json(Car);
    }).catch(err => {
        res.json(err);
    });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    await services.updateCar(id, payload).then(Car => {
        res.json(Car);
    }).catch(err => {
        res.json(err);
    });
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await services.deleteCar(id).then(Car => {
        res.json(Car);
    }).catch(err => {
        res.json(err);
    });
})

router.get('/Cars', async (req, res) => {
    await services.getAllCars().then(Cars => {
        res.json(Cars);
    }).catch(err => {
        res.json(err);
    });
})

module.exports = router;