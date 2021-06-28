class Book{

    static all = []

    static booksContainer = document.getElementById('books-container')
    static bookForm = document.getElementById('book-form')
    

    constructor({id, title, author, description, book_image, amazon_product_url, likes}){
        this.id = id 
        this.title = title
        this.author = author
        this.description = description
        this.book_image = book_image
        this.amazon_product_url = amazon_product_url
        this.likes = likes

        this.element = document.createElement('div')
        this.element.dataset.id = this.id
        this.element.id = `book-${this.id}`
        this.element.className = 'col-md-4 border border-info bg-light'

        Book.all.push(this)
    }

    bookHTML(){
        
        this.element.innerHTML += `
        <h2>${this.title}</h2>
        <h4>Author: ${this.author}</h4>
        <p>Description: ${this.description}</p>
        <img src=${this.book_image} data-id="${this.id}" class="book-img rounded">
        <br>
        <h2 data-id="${this.id}" class="like-book">${BLACK_HEART}</h2>
        <h3 id="likes-count-${this.id}">${this.likes} Likes</h3>
        <a class="btn btn-primary" href=${this.amazon_product_url}>Amazon Link</a><br><br>
        `
        
        return this.element

    }

    appendBookToDOM(){
        Book.booksContainer.appendChild(this.bookHTML())
    }

    static handleBookFormClick(e){
        e.target.remove()
        Book.bookForm.innerHTML += ` 
        <form id="new-book-form" class="row g-3">
            <div class="col">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" required>
                <label for="author" class="form-label">Author</label>
                <input type="text" class="form-control" id="author" required>
            </div>
            <div class="col">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" rows="3" required></textarea>
            </div>
            <div class="col">
                <label for="book-image" class="form-label">Book Image</label>
                <input type="text" class="form-control" id="book-image" placeholder="Paste image URL" required>
                <label for="amazon-product-url" class="form-label">Amazon URL</label>
                <input type="text" class="form-control" id="amazon-product-url" placeholder="Paste Amazon URL">
                <input type="submit" class="form-control btn btn-info" value="Add book">
            </div>
        </form>
        `
    }

    static handleLikeClick(e){
        if (e.target.className === "like-book" && e.target.innerText === BLACK_HEART){
            bookService.increaseLikes(parseInt(e.target.parentElement.dataset.id))
            e.target.innerText = RED_HEART
            let currentLikes = parseInt(e.target.nextElementSibling.innerText)
            e.target.nextElementSibling.innerText = `${++currentLikes} Likes`
        } else if (e.target.className === "like-book" && e.target.innerText === RED_HEART){
            bookService.decreaseLikes(parseInt(e.target.parentElement.dataset.id))
            e.target.innerText = BLACK_HEART
            let currentLikes = parseInt(e.target.nextElementSibling.innerText)
            e.target.nextElementSibling.innerText = `${--currentLikes} Likes`
        }
    }

    static handleBookSubmit(e){
        e.preventDefault()
        bookService.createBook()
        e.target.reset()
    }

    static handleShowPageClick(e){
        if (e.target.className === "book-img rounded"){
            const book = Book.all.find(b => b.id === parseInt(e.target.dataset.id))
            Book.booksContainer.innerHTML = ""
            Book.booksContainer.innerHTML = `
            <div data-id="${book.id}" id="book-${book.id}" class="col-md-6 border border-info bg-light">
                <h2>${book.title}</h2>
                <h4>Author: ${book.author}</h4>
                <p>Description: ${book.description}</p>
                <img src=${book.book_image} data-id="${book.id}" class="book-img-show">
                <br>
                <h2 data-id="${book.id}" class="like-book">${BLACK_HEART}</h2>
                <h3 id="likes-count-${book.id}">${book.likes} Likes</h3>
                <a class="btn btn-primary" href=${book.amazon_product_url}>Amazon Link</a><br>
                <h4>Users who like this book also recommend:</h4>
                <ul id="rec-list-${book.id}"></ul>
                <button id="new-recommendation-button" class="btn btn-success" >Add a Recommendation</button><br><br>
                <a id="back-bttn" href="#">Back</a>
            </div
            `
            book.appendRecommendationsToDOM()

            const newRecButton = document.getElementById('new-recommendation-button')
            newRecButton.addEventListener('click', Recommendation.handleRecClick)   

            const backBttn = document.getElementById('back-bttn')
            backBttn.addEventListener('click', Book.goBack)
        }
    }

    static goBack(){
        Book.booksContainer.innerHTML = ""
        bookService.getBooks()
    }

    bookRecommendations = () => {
        const bookRecs = Recommendation.filterRecommendations(this.id)
      
        let bookRecsArray = bookRecs.map((rec) => { 
            rec.element = document.createElement('li')
            rec.element.id = `recommendation-${rec.id}`
            
            rec.element.innerHTML += `
            ${rec.title} - ${rec.author}
            `        
            return rec.element
        })

        return bookRecsArray
    }

    appendRecommendationsToDOM = () => {
        const recList = document.querySelector(`#rec-list-${this.id}`)
        for(let i=0; i<this.bookRecommendations().length; i++){
            recList.appendChild(this.bookRecommendations()[i])
        }
    }


    static orderByMostLiked(){
        const books = Book.all
        let sortedBooks = books.sort((a,b) => (a.likes < b.likes) ? 1 : -1)
        Book.booksContainer.innerHTML = ""
        for(let i=0; i<sortedBooks.length; i++){
            sortedBooks[i].appendBookToDOM()
        }
        //duplicating first 3 books?
    }

    // static searchBooks() {
    //     let input = document.getElementById('searchbar').value.toLowerCase()
    //     let x = document.querySelectorAll('.col-md-4');
        
    //     for (let i = 0; i < x.length; i++) { 
    //         if (x[i].title.toLowerCase().includes(input)) {
    //             Book.booksContainer.innerHTML = ""
    //             Book.booksContainer.appendChild(x[i])      
    //         }
    //     }
    // }



    


}