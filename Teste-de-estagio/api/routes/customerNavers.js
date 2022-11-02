
module.exports = app => {
    const controller = app.controllers.customerNavers;
  
    app.route('/api/v1/customerNavers')
      .get(controller.listCustomerNavers)
      .post(controller.saveCustomerNavers);

  }