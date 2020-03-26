const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //conexão de dev

module.exports = connection; // importar esse arquivo dentro dos arquivos que vc precise se comunicar com o banco de dados (ex: routes)



