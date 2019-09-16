// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const endCustomerFinancialAssets = require('../controllers/endCustomerFinancialAssets.controller');
    app.post('/api/endCustomerFinancialAssets', endCustomerFinancialAssets.create);
    app.get('/api/endCustomerFinancialAssets/:id', endCustomerFinancialAssets.findOne);
    app.put('/api/endCustomerFinancialAssets/:id', endCustomerFinancialAssets.update);  
    //app.get('/api/professional', professional.findAll);
  };