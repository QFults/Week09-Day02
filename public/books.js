const axios = window.axios

document.addEventListener('click', event => {
  if (event.target.className === 'startBook') {
    axios.put(`/api/books/${event.target.dataset.id}`, {
      date: new Date(),
      isStarted: true
    })
      .then(() => {
        window.location.reload()
      })
  } else if (event.target.className === 'updatePage') {
    const id = event.target.dataset.id
    axios.put(`/api/books/${event.target.dataset.id}`, {
      page: document.getElementById(`page${id}`).value
    })
      .then(() => {
        window.location.reload()
      })
  }
})