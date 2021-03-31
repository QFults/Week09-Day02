const axios = window.axios

document.getElementById('createBook').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/books', {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    page: document.getElementById('page').value
  })
    .then(({ data: book }) => {
      const bookElem = document.createElement('li')
      bookElem.innerHTML = `
      <li>
        <p>${book.title}</p>
        <p>Date started: ${book.date}</p>
        <p>Current page: ${book.page}</p>
      </li>
      `
      document.getElementById('books').append(bookElem)
    })
    .catch(err => console.error(err))
})
