module.exports = (sequelize, dataType) => {
    const meal = sequelize.define('meal', {
      description: {
        type: dataType.STRING,
        allowNull: false,
        trim: true,
      },
    
      email: {
        type: dataType.STRING,
        allowNull: false,
        unique: false,
        trim: true,
        lowercase: true,
        
      },
      
      amount: {
        type: dataType.INTEGER,
        trim: true,
        allowNull: false,
      },
      
     
    });
  
    return meal;
  };