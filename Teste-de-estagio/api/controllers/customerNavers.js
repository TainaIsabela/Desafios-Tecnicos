const uuidv4 = require('uuid/v4');

module.exports = app => {
    const customerNaversDB = app.data.customerNavers;
    const controller = {};
    const {
        customerNavers: customerNaversMock,
    } = customerNaversDB;
    
    controller.listCustomerNavers = (req, res) => res.status(200).json(customerNaversDB);
  
    controller.saveCustomerNavers = (req, res) => {
        customerNaversMock.data.push({
            id: uuidv4(),
            name: req.body.name,
            birthdate: req.body.birthdate,
            job_role: req.body.job_role,
            admission_date: req.body.admission_date

        });
        res.status(201).json(customerNaversMock);
    }

    return controller;

  }
  