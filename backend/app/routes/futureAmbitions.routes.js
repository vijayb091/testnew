module.exports = (app) =>{
    const futureAmbitions = require('../controllers/futureAndAmbitions.controller')
    app.post('/api/future_ambition', futureAmbitions.create)
    app.get('/api/future_ambition',futureAmbitions.findAll)
    app.get('./api/future_ambition/:id', futureAmbitions.findOne)
    app.put('/api/future_ambition/:id', futureAmbitions.update)
}