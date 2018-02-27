'use strict'

let connection = require('./db')

let userModel = {}

userModel.getUsers = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM users ORDER BY id', (err, rows) => {
      if (err) {
        throw err
      } else {
        callback(null, rows)
      }
    })
  }
}

userModel.insertUser = (userData, callback) => {
  if (connection) {
    connection.query('INSERT INTO users SET ?', userData, (err, rows) => {
      if (err) {
        console.log(err)
        throw err
      } else {
        callback(null, {
          'insertId': rows.insertId
        })
      }
    })
  }
}

userModel.updateUser = (userData, callback) => {
  if (connection) {
    let sql = `
        UPDATE users SET
        username = ${connection.escape(userData.username)},
        password = ${connection.escape(userData.password)},
        email = ${connection.escape(userData.email)}
        where id = ${connection.escape(userData.id)}`

    connection.query(sql, (err, rows) => {
      if (err) {
        throw err
      } else {
        callback(null, {'message': 'User updated'})
      }
    })
  }
}

userModel.deleteUser = (id, callback) => {
  if (connection) {
    let sql = `SELECT * FROM users WHERE id = ${connection.escape(id)}`
    connection.query(sql, (err, row) => {
      if (row) {
        let sql = `DELETE FROM users WHERE id = ${id}`
        connection.query(sql, (err, req) => {
          if (err) {
            throw err
          } else {
            callback(null, {'message': 'user deleted'})
          }
        })
      } else if (err) {
        callback(null, {'message': `not exists ${err}`})
      }
    })
  }
}

module.exports = userModel
