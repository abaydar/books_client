class Book{

    static all = []

    static booksContainer = document.getElementById('books-container')

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
        <div>
            <h2>${this.title}</h2>
            <h4>Author: ${this.author}</h4>
            <p>Description: ${this.description}</p>
            <img src=${this.book_image}>
            <br>
            <a href=${this.amazon_product_url}>Amazon Link</a>
        </div>
        `
        return this.element
    }

    appendBookToDOM(){
        Book.booksContainer.append(this.bookHTML())
    }
}