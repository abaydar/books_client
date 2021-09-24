
const base_url = "http://localhost:3000"
const bookService = new BookService(base_url)
const recommendationService = new RecommendationService(base_url)
const newFormButton = document.getElementById('new-form-button')
const orderBooksButton = document.querySelector("#top-likes")
// const searchBar = document.getElementById('searchbar')
const BLACK_HEART = "🖤"
const RED_HEART = "❤️"

document.body.style.backgroundColor = "#cc99ff";

recommendationService.getRecommendations()
bookService.getBooks()

newFormButton.addEventListener('click', Book.handleBookFormClick)
orderBooksButton.addEventListener('click', Book.orderByMostLiked)

Book.bookForm.addEventListener('submit', Book.handleBookSubmit)

Book.booksContainer.addEventListener('click', Book.handleLikeClick)

Book.booksContainer.addEventListener('click', Book.handleShowPageClick)

searchBar.addEventListener('keyup', Book.searchBooks)

