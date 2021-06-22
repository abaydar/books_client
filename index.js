
const base_url = "http://localhost:3000"
const bookService = new BookService(base_url)
const newFormButton = document.getElementById('new-form-button')


bookService.getBooks()

User.userForm()
newFormButton.addEventListener('click', Book.handleClick)

Book.bookForm.addEventListener('submit', handleBookSubmit)
User.userFormConatiner.addEventListener('submit', handleUserSubmit)

function handleBookSubmit(e){
    e.preventDefault()
    bookService.createBook()
}

function handleUserSubmit(e){
    e.preventDefault()
    debugger
}

