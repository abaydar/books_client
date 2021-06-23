
const base_url = "http://localhost:3000"
const bookService = new BookService(base_url)
const recommendationService = new RecommendationService(base_url)
const newFormButton = document.getElementById('new-form-button')


bookService.getBooks()

newFormButton.addEventListener('click', Book.handleBookClick)

Book.bookForm.addEventListener('submit', handleBookSubmit)

function handleBookSubmit(e){
    e.preventDefault()
    bookService.createBook()
}


