// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const endCustomerWalletDetail = require('../controllers/endCustomerWalletDetail.controller');
    app.post('/api/endCustomerWalletDetail', endCustomerWalletDetail.create);
    app.get('/api/endCustomerWalletDetail/:id', endCustomerWalletDetail.findOne);
    app.put('/api/endCustomerWalletDetail/:id', endCustomerWalletDetail.update);  
    //app.get('/api/professional', professional.findAll);
  };