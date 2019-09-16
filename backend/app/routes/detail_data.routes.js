module.exports = (app)=>{
    const detailData = require('../controllers/detail_data.controller')
    app.get('/api/detail_data', detailData.get_data)
    app.get('/api/detail_data/:id',detailData.getSingleData)
}