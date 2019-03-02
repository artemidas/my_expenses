const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const expenses = require('./routes/expenses')

const app = express()

app.use(bodyParser.json())

app.use(expenses)

module.exports = {
  path: '/api',
  handler: app
}
