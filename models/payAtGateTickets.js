module.exports = (sequelize, dataType) => {
    const gate = sequelize.define('gate', {
      name: {
        type: dataType.STRING,
        allowNull: false,
        trim: true,
      },
    
      email: {
        type: dataType.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        lowercase: true,
        
      },
      gender: {
        type: dataType.STRING,
        allowNull: false,
        
      },
      phone: {
        type: dataType.INTEGER,
        trim: true,
      },
      
     
    });
  
    return gate;
  };