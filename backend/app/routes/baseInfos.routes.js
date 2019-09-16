// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
  const baseInfos = require('../controllers/baseInfos.controller');

  app.get('/api/baseinfo', baseInfos.findAll);
  app.post('/api/baseinfo', baseInfos.create);
  app.get('/api/baseinfo/:id', baseInfos.findOne);
  app.put('/api/baseinfo/:id', baseInfos.update);
  app.delete('/api/baseinfo/:id', baseInfos.delete);

};