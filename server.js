const express = require('express')
const { join } = require('path')
const ObjectId = require('mongojs').ObjectId

const db = require('mongojs')('booksdb')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('.hbs', require('express-handlebars')({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(require('./routes'))

require('./db')
  .then(() => app.listen(3000))
  .catch(err => console.log(err))
