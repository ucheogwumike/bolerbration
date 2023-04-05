module.exports = (sequelize, dataType) => {
    const pay = sequelize.define('pay', {
      
      amount: {
        type: dataType.INTEGER,
        trim: true,
        allowNull:false
      },
      
     ticketId:{
        type:dataType.STRING,
        allowNull: false,
     }
    });
  
    return pay;
  };