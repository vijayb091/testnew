module.exports = (app)=>{
    const getPieData = require('../controllers/getPieData.controller')
    app.get('/api/graph/:type',getPieData.getData);
    // app.get('/api/get_advisor', getPieData.getData);
}