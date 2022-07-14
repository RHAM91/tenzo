const mysql = require('mysql2')
const { database } = require('./config')


const pool = mysql.createPool(database)
const db = pool.promise()
console.log('----> MySQL activo')

module.exports = db
