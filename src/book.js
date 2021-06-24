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

        Book.all.push(this)
    }

    bookHTML(){
        
        this.element.innerHTML += `
        <h2>${this.title}</h2>
        <h4>Author: ${this.author}</h4>
        <p>Description: ${this.description}</p>
        <img src=${this.book_image} data-id="${this.id}" class="book-img">
        <br>
        <h2 data-id="${this.id}" class="like-book">${BLACK_HEART}</h2>
        <h3 id="likes-count-${this.id}">${this.likes} Likes</h3>
        <button id="new-recommendation-button">Add a Recommendation</button><br><br>
        <a href=${this.amazon_product_url}>Amazon Link</a><br>
        <ul id="rec-list-${this.id}"></ul>
        `
        
        return this.element

    }

    appendBookToDOM(){
        Book.booksContainer.append(this.bookHTML())

        const newRecButton = document.getElementById('new-recommendation-button')
        newRecButton.addEventListener('click', Recommendation.handleRecClick)
    }

    static handleBookClick(e){
        e.target.remove()
        Book.bookForm.innerHTML += `
        <form id="new-book-form">
            Title: <input type="text" id="title"><br>
            Author: <input type="text" id="author"><br>
            Description: <input type="textarea" id="description"><br>
            Book Image URL: <input type="text" id="book-image"><br>
            Amazon URL: <input type="text" id="amazon-product-url"><br>
            <input type="submit" value="Add book">
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
    }

    static handleShowPageClick(e){
        if (e.target.className === "book-img"){
            const book = Book.all.find(b => b.id === parseInt(e.target.dataset.id))
            const bookDiv = parseInt(e.target.parentElement.dataset.id)
            debugger
            Book.booksContainer.innerHTML = ""
            Book.booksContainer.innerHTML = `
            <h2>${book.title}</h2>
            <h4>Author: ${book.author}</h4>
            <p>Description: ${book.description}</p>
            <img src=${book.book_image} data-id="${book.id}" class="book-img">
            <br>
            <h2 data-id="${book.id}" class="like-book">${BLACK_HEART}</h2>
            <h3 id="likes-count-${book.id}">${book.likes} Likes</h3>
            <button id="new-recommendation-button">Add a Recommendation</button><br><br>
            <a href=${book.amazon_product_url}>Amazon Link</a><br>
            <h4>Users who like this book also recommend:</h4>
            <ul id="rec-list-${book.id}"></ul>
            <a id="back-bttn" href="#">Back</a>
            `
            book.appendRecommendationsToDOM()

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

    


}