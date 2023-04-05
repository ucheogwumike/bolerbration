const Sequelize = require('sequelize');
const sequelize = new Sequelize('bolebration','eskimojoe','wazza100',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        min:0,
        max:10000,
        acquire:5000,
        Idle:1000
    },
});

sequelize.
    authenticate()
    .then(()=>{console.log('database connected')})
    .catch((err)=>{
        console.log(err)
    })

    const db ={};
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.free = require('./freeTickets')(sequelize,Sequelize);
    db.meal = require('./mealTicket')(sequelize,Sequelize);
    db.gate = require('./payAtGateTickets')(sequelize,Sequelize);
    db.pay = require('./payments')(sequelize,Sequelize);
    db.regular = require('./regularTickets')(sequelize,Sequelize);
    db.vip = require('./vipTickets')(sequelize,Sequelize);


    module.exports = db;