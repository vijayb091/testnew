// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const personalInfos = require('../controllers/personalinfos.controllers');
    app.post('/api/personalinfo', personalInfos.create);  
    app.get('/api/personalinfo', personalInfos.findAll);
    app.get('/api/personalinfo/:id', personalInfos.findOne);
    app.put('/api/personalinfo/:id', personalInfos.update);
  };