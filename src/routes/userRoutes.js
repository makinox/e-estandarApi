const User = require('../models/user')

module.exports = function (app) {
  app.get('/users', (req, res) => {
    User.getUsers((err, data) => {
      if (err) {
        console.log(`not exists ${err}`)
      } else {
        res.status(200).json(data)
      }
    })
  })
  app.post('/users', (req, res) => {
    const userData = {
      id: null,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      created_at: null,
      updated_at: null
    }
    User.insertUser(userData, (err, data) => {
      if (data && data.insertId) {
        console.log(data)
        res.json({
          success: true,
          msg: 'Usuario insertado',
          data: data
        })
      } else if (err) {
        res.status(500).json({
          success: false,
          message: `Error ${err}`
        })
      }
    })
  })
  app.put('/users/:id', (req, res) => {
    const userData = {
      id: req.params.id,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      created_at: null,
      updated_at: null
    }
    User.updateUser(userData, (err, data) => {
      if (data && data.msg) {
        res.json(data)
      } else if (err) {
        res.json({
          success: false,
          message: `Error ${err}`
        })
      } else {
        res.json({
          success: true,
          message: 'User update',
          data
        })
      }
    })
  })

  app.delete('/users/:id', (req, res) => {
    User.deleteUser(req.params.id, (err, data) => {
      if ((data && data.message === 'user deleted') || (data.message === 'user deleted')) {
        res.json({
          success: true,
          data
        })
      } else if (err) {
        res.status(500).json({
          message: `Error ${err}`
        })
      }
    })
  })
}
