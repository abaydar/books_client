class Book{

    static all = []

    static booksContainer = document.getElementById('books-container')
    static bookForm = document.getElementById('book-form')
    

    constructor({id, title, author, description, book_image, amazon_product_url}){
        this.id = id 
        this.title = title
        this.author = author
        this.description = description
        this.book_image = book_image
        this.amazon_product_url = amazon_product_url

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
        <img src=${this.book_image}>
        <br>
        <a href=${this.amazon_product_url}>Amazon Link</a><br>
        <h4>Users who like this book also recommend:</h4>
        <button id="new-recommendation-button">Add a Recommendation</button>
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

    bookRecommendations(){
        const bookRecs = Recommendation.filterRecommendations(this.id)
        
        return bookRecs.forEach((rec) => {

            rec.element = document.createElement('li')
            rec.element.dataset.id = this.id
            rec.element.id = `recommendation-${rec.id}`

            rec.element.innerHTML += `
            ${rec.title} - ${rec.author}
            `        
            return rec.element  
        })
        
    }

    appendRecommendationsToDOM(){
        const recList = document.querySelector(`#rec-list-${this.id}`)

        recList.append(this.bookRecommendations())
    }


}