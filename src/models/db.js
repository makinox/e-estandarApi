'use strict'

const mysql = require('mysql')
const databasePass = require('../../config.js')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: databasePass,
  database: 'testapi'
})

module.exports = connection
