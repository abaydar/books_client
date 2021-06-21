
const base_url = "http://localhost:3000"
const bookService = new BookService(base_url)
const newFormButton = document.getElementById('new-form-button')


bookService.getBooks()

newFormButton.addEventListener('click', Book.handleClick)

Book.bookForm.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    bookService.createBook()
}

