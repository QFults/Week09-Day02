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
  res.render('search')
})
app.get('/books', (req, res) => {
  db.books.find({}, (err, books) => {
    if (err) { console.log(err) }

    books = books.map(book => ({
      ...book,
      pagesLeft: book.pagecount - book.page
    }))

    res.render('books', { books })
  })
})
app.get('/books/:id', (req, res) => {
  db.books.find({ _id: ObjectId(req.params.id) }, (err, books) => {
    if (err) { console.log(err) }
    res.render('book', { book: books[0] })
  })
})
app.post('/books', (req, res) => {
  db.books.insert(req.body, (err, book) => {
    if (err) { console.log(err) }
    res.json(book)
  })
})
app.put('/books/:id', (req, res) => {
  db.books.update({ _id: ObjectId(req.params.id) }, { $set: req.body }, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

app.listen(3000)
