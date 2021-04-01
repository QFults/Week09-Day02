const router = require('express').Router()
const { Book } = require('../models')

router.post('/books', (req, res) => Book.create(req.body)
  .then(book => res.json(book))
  .catch(err => console.log(err)))

router.put('/books/:id', (req, res) => Book.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
