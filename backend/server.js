const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const appConfig = require('./config/app');
const config = require('./config/config');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Initialize App configuration
appConfig(app);
app.use(passport.initialize());

mongoose.Promise = global.Promise;

mongoose.connect(config.url)
.then(() => {
  console.log("Successfully connected to the database");
})
.catch(err => {
  console.log('Could not connect to the database. Exiting now...');
    process.exit();
})

// Initialize Passport
const initPassport = require('./passport/init');
// initPassport(passport);

app.get('/', (req, res) => {
  res.json({"message": "Welcome to BidiEye"});
});

// require('./app/routes/note.routes')(app);
// require('./app/routes/auth.routes')(app, passport);
require('./app/routes/baseInfos.routes')(app);
require('./app/routes/personalInfos.routes')(app);
// require('./app/routes/percentages.routes')(app);
require('./app/routes/professional.routes')(app);
require('./app/routes/futureAmbitions.routes')(app)
require('./app/routes/lifestyles.routes')(app)
require('./app/routes/detail_data.routes')(app)
require('./app/routes/getPieData.routes')(app)
require('./app/routes/financialknowledge.route')(app)
require('./app/routes/recruiting.routes')(app)
require('./app/routes/endCustomerFinancialAssets.routes')(app)
require('./app/routes/endCustomerInterview.routes')(app)
require('./app/routes/endCustomerRevenue.routes')(app)
require('./app/routes/endCustomerWalletDetail.routes')(app)

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
