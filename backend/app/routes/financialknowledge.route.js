// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const financialknowledge = require('../controllers/financialknowledge.controller');
    app.post('/api/financialknowledge', financialknowledge.create);
  app.get('./api/financialknowledge/:id', financialknowledge.findOne)
  app.put('/api/financialknowledge/:id', financialknowledge.update)
    //app.get('/api/professional', professional.findAll);
  }; 