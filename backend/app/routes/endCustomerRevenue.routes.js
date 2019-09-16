// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const endCustomerRevenue = require('../controllers/endCustomerRevenue.controller');
    app.post('/api/endCustomerRevenue', endCustomerRevenue.create);
    app.get('/api/endCustomerRevenue/:id', endCustomerRevenue.findOne);
    app.put('/api/endCustomerRevenue/:id', endCustomerRevenue.update);  
    //app.get('/api/professional', professional.findAll);
  };