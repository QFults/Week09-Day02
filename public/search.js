const axios = window.axios
const alert = window.alert

// document.getElementById('createBook').addEventListener('click', event => {
//   event.preventDefault()

//   axios.post('/books', {
//     title: document.getElementById('title').value,
//     date: document.getElementById('date').value,
//     page: document.getElementById('page').value
//   })
//     .then(({ data: book }) => {
//       const bookElem = document.createElement('li')
//       bookElem.innerHTML = `
//       <li>
//         <p>${book.title}</p>
//         <p>Date started: ${book.date}</p>
//         <p>Current page: ${book.page}</p>
//       </li>
//       `
//       document.getElementById('books').append(bookElem)
//     })
//     .catch(err => console.error(err))
// })

document.getElementById('searchBook').addEventListener('click', event => {
  event.preventDefault()

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${document.getElementById('search').value}`)
    .then(({ data: { items: books } }) => {
      console.log(books)
      document.getElementById('books').innerHTML = ''
      books.forEach(book => {
        const bookElem = document.createElement('div')
        bookElem.innerHTML = `
          <img class="cover" src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}" alt="${book.volumeInfo.title}">
          <h2>${book.volumeInfo.title}</h2>
          <div
            data-title="${book.volumeInfo.title}"
            data-cover="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}"
            data-authors="${book.volumeInfo.authors}"
            data-categories="${book.volumeInfo.categories}"
            data-description="${book.volumeInfo.description}"
            data-pagecount="${book.volumeInfo.pageCount}"
            data-published="${book.volumeInfo.publishedDate}">
            <button class="addBook">Add to reading list</button>
          </div>
        `
        document.getElementById('books').append(bookElem)
      })
    })
})

document.addEventListener('click', event => {
  if (event.target.className === 'addBook') {
    const { title, cover, authors, categories, description, pagecount, published } = event.target.parentNode.dataset

    axios.post('/books', {
      title,
      cover,
      authors,
      categories,
      description,
      pagecount,
      published,
      page: 0,
      date: 'Not Started',
      isStarted: false
    })
      .then(() => {
        alert('Book added to reading list!')
      })
  }
})
