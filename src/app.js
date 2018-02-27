'use strict'

const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

const port = 3000

// settings
app.set('port', process.env.PORT || port)

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

// routes
require('./routes/userRoutes')(app)

app.listen(app.get('port'), () => {
  console.log(`REST api listening on port: ${port}`)
})
