module.exports = require('mongoose').connect('mongodb://localhost/booksdb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
