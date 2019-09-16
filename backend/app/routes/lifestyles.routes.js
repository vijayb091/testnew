module.exports = (app) =>{
    const lifeStyle = require('../controllers/lifeStyle.controller')
    app.post('/api/lifestyles', lifeStyle.create)
    app.get('./api/lifestyles/:id',lifeStyle.findOne)
    app.put('/api/lifestyles/:id', lifeStyle.update)

}