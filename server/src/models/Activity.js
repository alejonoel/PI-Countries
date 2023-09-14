const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id:{
        type: DataTypes.UUID, // a la hora de crear una actividad nueva, no se necesita pasar el ID
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
    },
    duration: {
        type: DataTypes.FLOAT, // Usamos FLOAT para permitir decimales
        allowNull: true,
    },
    season: {
        type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
        allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
  );
};