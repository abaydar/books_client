
const base_url = "http://localhost:3000"
const bookService = new BookService(base_url)
const recommendationService = new RecommendationService(base_url)
const newFormButton = document.getElementById('new-form-button')
const BLACK_HEART = "🖤"
const RED_HEART = "❤️"

recommendationService.getRecommendations()
bookService.getBooks()

newFormButton.addEventListener('click', Book.handleBookFormClick)

Book.bookForm.addEventListener('submit', Book.handleBookSubmit)
Book.booksContainer.addEventListener('click', Book.handleLikeClick)

Book.booksContainer.addEventListener('click', Book.handleShowPageClick)

function validateForm() {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  }

