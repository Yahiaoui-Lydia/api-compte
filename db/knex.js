//Ce fichier exportera un module de connexions basé sur l'environnement
const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
module.exports = require('knex')(config)