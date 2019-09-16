// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const professional = require('../controllers/professional.controller');
    app.post('/api/professional', professional.create);  
    //app.get('/api/professional', professional.findAll);
    app.get('/api/professional/:id', professional.findOne);
    app.put('/api/professional/:id', professional.update);
  };