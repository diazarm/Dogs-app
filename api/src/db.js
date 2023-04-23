require('dotenv').config();
const {Sequelize, DataTypes} = require ("sequelize");
//const fs = require('fs');
//const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST,DB_NAME} = process.env;
const DogsModels = require('./models/DogsModels')
const TemperamentsModels = require('./models/TemperamentsModels')


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // No muestra en consola cuando ejecuta un comando.
  native: false, // No utiliza el controlar nativo de pg.
});


//definimos los modelos a usar
DogsModels(sequelize);
TemperamentsModels(sequelize);

//creamos la relaciones 

const {Dogs, Temperaments} = sequelize.models; //define() es el metodo que define el modelo.

Dogs.belongsToMany(Temperaments,{through: "temperament_Dogs"});
Temperaments.belongsToMany(Dogs,{through: "temperament_Dogs"});


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};





// const basename = path.basename(__filename);

// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);

// // En sequelize.models están todos los modelos importados como propiedades
// // Para relacionarlos hacemos un destructuring
// const { Dog } = sequelize.models;

// // Aca vendrian las relaciones
// // Product.hasMany(Reviews);

