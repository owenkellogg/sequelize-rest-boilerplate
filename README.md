##Sequelize REST Boilerplate

### Installation

    npm install sequelize-rest-boilerplate

### Usage

    var SQLRest = require('sequelize-rest-boilerplate');
    var Payment = require('./sequelize_payment_model');

    var router = new SQLRest(Payment, 'payment', payments');
    app.use('/payments', router); 

    app.listen(process.env.PORT);

