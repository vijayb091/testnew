// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const endCustomerInterview = require('../controllers/endCustomerInterview.controller');
    app.post('/api/endCustomerInterview', endCustomerInterview.create);
    app.get('/api/endCustomerInterview/:id', endCustomerInterview.findOne);
    app.put('/api/endCustomerInterview/:id', endCustomerInterview.update);
    //app.get('/api/professional', professional.findAll);
  };