const { model, Schema } = require('mongoose')

const BookSchema = new Schema({
  title: String,
  cover: String,
  authors: String,
  categories: String,
  description: String,
  pagecount: Number,
  published: String,
  page: Number,
  date: String,
  isStarted: Boolean
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

BookSchema.virtual('pagesLeft').get(function () {
  return this.pagecount - this.page
})

BookSchema.plugin(require('mongoose-lean-virtuals'))

module.exports = model('Book', BookSchema)
