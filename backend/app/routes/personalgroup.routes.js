module.exports = (app) =>{
    const personalGroup = require('../controllers/personalgroup.controller')

    app.post('/api/personalgroup/:id',personalGroup.create)
    app.get('/api/personalgroup/:id',personalGroup.getAll)
    app.delete('/api/personalgroup/:id',personalGroup.delete)
}