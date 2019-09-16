// const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
    const percentages = require('../controllers/percentages.controller');
    app.get('/api/percentage', percentages.getTheData); 
  };