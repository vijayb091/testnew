// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const recruiting = require('../controllers/recruiting.controllers');
    app.post('/api/recruiting', recruiting.create);
    app.get('./api/recruiting/:id', recruiting.findOne)
    app.put('/api/recruiting/:id', recruiting.update)
    //app.get('/api/professional', professional.findAll);
  };