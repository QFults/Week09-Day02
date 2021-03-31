const express = require('express')
const { join } = require('path')

const db = require('mongojs')('booksdb')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('.hbs', require('express-handlebars')({ extname: '.hbs' }))
app.set('view engine', '.hbs')

// app.get('/', (req, res) => {
// res.render('index', { name: 'John Doe', age: 47 })
// res.render('index', {
//   person: {
//     name: 'John Doe',
//     age: 47
//   }
// })
// res.render('index', {
//   people: ['John Doe', 'Jane Doe', 'Jack Doe']
// })
// res.render('index', {
//   isDone: false
// })
// res.render('index', {
//   people: [
//     {
//       name: 'John Doe'
//     },
//     {
//       name: 'Jane Doe'
//     },
//     {
//       name: 'Jack Doe'
//     }
//   ]
// })
// })

app.get('/', (req, res) => {
  db.books.find({}, (err, books) => {
    if (err) { console.log(err) }
    res.render('books', { books })
  })
})
app.post('/books', (req, res) => {
  db.books.insert(req.body, (err, book) => {
    if (err) { console.log(err) }
    res.json(book)
  })
})

app.listen(3000)
