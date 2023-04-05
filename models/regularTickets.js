module.exports = (sequelize, dataType) => {
    const regular = sequelize.define('regular', {
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
  
    return regular;
  };